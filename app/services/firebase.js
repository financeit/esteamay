import Service from '@ember/service'
import { initializeApp } from 'firebase/app'
import { getFirestore, onSnapshot, query, collection, deleteDoc, doc, addDoc, getDoc, setDoc, getDocs } from 'firebase/firestore'
import Cookies from 'js-cookie'
import { getOwner } from '@ember/application'

export default class FirebaseService extends Service {
  constructor() {
    super(...arguments)

    const envConfig = getOwner(this).resolveRegistration('config:environment')
    const app = initializeApp(envConfig.firebaseConfig)

    this.db = getFirestore(app)
    this.listeners = []
  }

  async listenForReveal(roomId, callback) {
    let currDate = new Date().getTime()
    let listener = onSnapshot(doc(this.db, 'rooms', roomId), async (snapshot) => {
      let reveal = snapshot.data().reveal
      if (reveal > currDate) {
        callback(await this.reveal(roomId, true))
      }
      console.log(snapshot)
    })
    this.listeners.push(listener)
  }

  async listenForReset(roomId, callback) {
    let currDate = new Date().getTime()
    let listener = onSnapshot(doc(this.db, 'rooms', roomId), async (snapshot) => {
      let reset = snapshot.data().reset
      if (reset > currDate) {
        callback(await this.reset(roomId, true))
      }
      console.log(snapshot)
    })
    this.listeners.push(listener)
  }

  async setScoreDoc(roomId) {
    if (!this.scoreId) {
      let scoreId = Cookies.get('room-' + roomId)
      if (scoreId) {
        this.scoreId = scoreId
        return this.scoreId
      }
    } else {
      return this.scoreId
    }
    console.log('setScoreDoc in room ' + roomId)
    const collectionRef = collection(this.db, 'rooms', roomId, 'scores')
    const scoreDoc = await addDoc(collectionRef, {})
    this.scoreId = scoreDoc.id
    Cookies.set('room-' + roomId, this.scoreId)
    console.log('new scoreId ' + this.scoreId)
    return this.scoreId
  }

  async updateResetTimestamp(roomId) {
    return await setDoc(doc(this.db, 'rooms', roomId), { reset: new Date().getTime() })
  }

  async updateRevealTimestamp(roomId) {
    return await setDoc(doc(this.db, 'rooms', roomId), { reveal: new Date().getTime() })
  }

  async getScore(roomId, scoreId) {
    let scoreDoc = await getDoc(doc(this.db, 'rooms', roomId, 'scores', scoreId))
    return scoreDoc.data()?.score
  }

  async setScore(roomId, scoreId, score) {
    const scoreRef = doc(this.db, 'rooms', roomId, 'scores', scoreId)
    return await setDoc(scoreRef, { score })
  }

  async reset(roomId, dontUpdateReset) {
    if (!dontUpdateReset) this.updateResetTimestamp(roomId)

    // add code to delete all of the scores in the firebase room
    const q = query(collection(this.db, 'rooms', roomId, 'scores'))
    const scoreDocs = await getDocs(q)

    scoreDocs.forEach(async scoreDoc => {
      let scoreRef = doc(this.db, 'rooms', roomId, 'scores', scoreDoc.id)
      await deleteDoc(scoreRef)

      console.log('deleted ', scoreDoc.id, ' => ', scoreDoc.data())
    })
    console.log('reset scores for room: ', roomId)
  }

  async createRoom(roomId) {
    try {
      await setDoc(doc(this.db, 'rooms', roomId), { roomId })
      let scoreDocId = await this.setScoreDoc(roomId)
      console.log('Room created with scoreID: ', scoreDocId)
      return scoreDocId
    } catch (e) {
      console.error('Error adding a room: ', e)
    }
  }

  async joinRoom(roomId) {
    try {
      const roomRef = doc(this.db, 'rooms', roomId)
      const docSnap = await getDoc(roomRef)

      if (docSnap.exists()) {
        console.log('Rooms data: ', docSnap.data())

        await this.setScoreDoc(roomId)
        return true
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
      }
    } catch (e) {
      console.error('Error joining the room: ', e)
    }
    return false
  }

  async vote(roomId, score) {
    try {
      const roomRef = doc(this.db, 'rooms', roomId)
      const room = await getDoc(roomRef)

      if (room.exists()) {
        await this.setScore(roomId, this.scoreId, score)
      } else {
       console.log('No such room!')
      }
    } catch (e) {
      console.error('Error voting the room: ', e)
    }
  }

  async reveal(roomId, dontUpdateReveal) {
    if (!dontUpdateReveal) this.updateRevealTimestamp(roomId)

    try {
      const roomRef = doc(this.db, 'rooms', roomId)
      const roomSnap = await getDoc(roomRef)

      if (roomSnap.exists()) {
        const querySnapshot = await getDocs(collection(this.db, 'rooms', roomId, 'scores'))
        let scoresSum = 0
        let scoresCount = 0
        let allScores = []
        let d = {}
        querySnapshot.forEach((doc) => {
          d = doc.data()
          if (d.score >= 0) {
            allScores.push(d.score)
            scoresSum += d.score
            scoresCount++
          }
        })

        let result = 'Unknown'
        if (scoresCount > 0) {
          allScores = allScores.join(', ')
          let average = Math.round(scoresSum / scoresCount)
          result = average.toString()
          result += '; Scores are: ' + allScores
        }

        return result
      } else {
        console.log('No such room!')
      }
    } catch (e) {
      console.error('Error revealing the room: ')
      console.error(e)
    }
    return false
  }
}
