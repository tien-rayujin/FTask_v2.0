// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA5Qp42cpSqa8tSUPmI_nTmHWwz7GsR37o',
  authDomain: 'ftask-3db0d.firebaseapp.com',
  projectId: 'ftask-3db0d',
  storageBucket: 'ftask-3db0d.appspot.com',
  messagingSenderId: '713040780244',
  appId: '1:713040780244:web:b5564dba0d4553e55fd441',
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig)
const storage = getStorage(firebase)

export { firebase, storage }
