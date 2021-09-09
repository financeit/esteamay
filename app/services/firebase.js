import Service from '@ember/service'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, addDoc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAMhrnEu1SbhoHZ8on5SWI79En8eb6U-KU',
  authDomain: 'esteamay-eca8d.firebaseapp.com',
  projectId: 'esteamay-eca8d',
  storageBucket: 'esteamay-eca8d.appspot.com',
  messagingSenderId: '1071522383728',
  appId: '1:1071522383728:web:32fa964c772b235c7031b5',
}

export default class FirebaseService extends Service {
  app = initializeApp(firebaseConfig);
  db = getFirestore(this.app)

  async createRoom(id) {
    try {
      await setDoc(doc(this.db, 'rooms', id), { id })
      const collectionRef = collection(this.db, 'rooms', id, 'scores')
      const scoreDoc = await addDoc(collectionRef, { })

      this.scoreId = scoreDoc.id

      console.log("Document written with ID: ", scoreDoc.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async joinRoom(id) {
    try {
      const roomRef = doc(this.db, 'rooms', id);
      const docSnap = await getDoc(roomRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const collectionRef = collection(this.db, 'rooms', id, 'scores')
        const scoreDoc = await addDoc(collectionRef, { })

        this.scoreId = scoreDoc.id
        return true
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (e) {
      console.error("Error joining the room: ", e);
    }
    return false
  }

  async vote(id, score) {
    try {
      const roomRef = doc(this.db, 'rooms', id);
      const room = await getDoc(roomRef);

      // Check room availability
      //if (room.exists()) {
        const scoreRef = doc(this.db, 'rooms', id, 'scores', this.scoreId)
        await setDoc(scoreRef, { score })
      //} else {
      //  console.log("No such room!");
      //}
    } catch (e) {
      console.error("Error voting the room: ", e);
    }
  }

  async reveal(id) {
    try {
      const roomRef = doc(this.db, 'rooms', id);
      const docSnap = await getDoc(roomRef);

      if (docSnap.exists()) {
        const scoresRef = doc(this.db, 'rooms', id, 'scores')
        const scoresSnap = await getDoc(scoresRef);

        console.log(scoresSnap.data())

        return true
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (e) {
      console.error("Error joining the room: ", e);
    }
    return false
  }
}
