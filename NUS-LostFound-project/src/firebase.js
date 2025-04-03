// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBG4Kl87U53ipwpXBhNvkENVHKtpbG1P0Q",
  authDomain: "bt3103-lnf.firebaseapp.com",
  projectId: "bt3103-lnf",
  storageBucket: "bt3103-lnf.firebasestorage.app",
  messagingSenderId: "504261803112",
  appId: "1:504261803112:web:07c8f3f46ab4078e804fdd",
  measurementId: "G-52K0YJXPJJ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp)
// export { auth };
export { firebaseApp, db, auth }
// export default firebaseApp;