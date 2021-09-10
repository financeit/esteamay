import Service from '@ember/service'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, doc, addDoc, getDoc, setDoc, getDocs } from 'firebase/firestore'
import Cookies from 'js-cookie'

const firebaseConfig = {
  apiKey: 'AIzaSyAMhrnEu1SbhoHZ8on5SWI79En8eb6U-KU',
  authDomain: 'esteamay-eca8d.firebaseapp.com',
  projectId: 'esteamay-eca8d',
  storageBucket: 'esteamay-eca8d.appspot.com',
  messagingSenderId: '1071522383728',
  appId: '1:1071522383728:web:32fa964c772b235c7031b5',
}


export default class FirebaseService extends Service {
  app = initializeApp(firebaseConfig)
  db = getFirestore(this.app)

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
    console.log('new scoreId ' + this.scoreId)
    return this.scoreId
  }

  async reset(roomId) {
    // add code to delete all of the scores in the firebase room
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
        const scoreRef = doc(this.db, 'rooms', roomId, 'scores', this.scoreId)
        await setDoc(scoreRef, { score })
      } else {
       console.log('No such room!')
      }
    } catch (e) {
      console.error('Error voting the room: ', e)
    }
  }

  async reveal(roomId) {
    try {
      const roomRef = doc(this.db, 'rooms', roomId)
      const roomSnap = await getDoc(roomRef)

      if (roomSnap.exists()) {
        const querySnapshot = await getDocs(collection(this.db, 'rooms', roomId, 'scores'))
        let scoresSum = 0
        let scoresCount = 0
        let d = {}
        querySnapshot.forEach((doc) => {
          d = doc.data()
          scoresSum += d.score
          scoresCount++
        })

        let average = 'Unknown'
        if (scoresCount > 0) {
          average = Math.round(scoresSum / scoresCount)
        }

        return average
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
