import Service from '@ember/service'
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAMhrnEu1SbhoHZ8on5SWI79En8eb6U-KU',
  authDomain: 'esteamay-eca8d.firebaseapp.com',
  projectId: 'esteamay-eca8d',
  storageBucket: 'esteamay-eca8d.appspot.com',
  messagingSenderId: '1071522383728',
  appId: '1:1071522383728:web:32fa964c772b235c7031b5',
}

export default class FirebaseService extends Service {
  constructor() {
    super(...arguments)

    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app)
  }

  async createRoom(id) {
    try {
      const docRef = await addDoc(collection(this.db, 'rooms'), {
        id,
        userType: 'owner'
      })
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async joinRoom(id) {
    try {

    } catch (e) {
      console.error("Error joining the room: ", e);
    }
  }
}
