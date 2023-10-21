import { getStorage } from 'firebase/storage'
import { type FirebaseApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyA5Qp42cpSqa8tSUPmI_nTmHWwz7GsR37o',
  authDomain: 'ftask-3db0d.firebaseapp.com',
  projectId: 'ftask-3db0d',
  storageBucket: 'ftask-3db0d.appspot.com',
  messagingSenderId: '713040780244',
  appId: '1:713040780244:web:b5564dba0d4553e55fd441',
}

function initializeStorage(firebaseApp: FirebaseApp) {
  getStorage(firebaseApp)
}

export { firebaseConfig, initializeStorage }
