import { getStorage } from 'firebase/storage'
import { type FirebaseApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyB0cXX9CeGCnyxCjf2kN1QGxm5wqTxWF3I',
  authDomain: 'ftask-bec4b.firebaseapp.com',
  projectId: 'ftask-bec4b',
  storageBucket: 'ftask-bec4b.appspot.com',
  messagingSenderId: '1000581992738',
  appId: '1:1000581992738:web:c658d945c72838528ed57b',
}

function initializeStorage(firebaseApp: FirebaseApp) {
  getStorage(firebaseApp)
}

export { firebaseConfig, initializeStorage }
