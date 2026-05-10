import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDbxGlnKVX09d8ivUOY6ZzBRgzZPuySiwk',
  authDomain: 'authentication-a704f.firebaseapp.com',
  projectId: 'authentication-a704f',
  storageBucket: 'authentication-a704f.firebasestorage.app',
  messagingSenderId: '379012656696',
  appId: '1:379012656696:web:fd365fc036c3df231cc0cd',
  measurementId: 'G-5S8TV1XWGT',
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }
