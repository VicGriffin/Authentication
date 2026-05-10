import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbxGlnKVX09d8ivUOY6ZzBRgzZPuySiwk",
  authDomain: "authentication-a704f.firebaseapp.com",
  projectId: "authentication-a704f",
  storageBucket: "authentication-a704f.firebasestorage.app",
  messagingSenderId: "379012656696",
  appId: "1:379012656696:web:fd365fc036c3df231cc0cd",
  measurementId: "G-5S8TV1XWGT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<App />} />
      </Routes>
    </Router>
  </StrictMode>,
)
