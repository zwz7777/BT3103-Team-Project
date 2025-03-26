// Only for FirebaseUI used for user authentication
import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyBG4Kl87U53ipwpXBhNvkENVHKtpbG1P0Q",
    authDomain: "bt3103-lnf.firebaseapp.com",
    projectId: "bt3103-lnf",
    storageBucket: "bt3103-lnf.firebasestorage.app",
    messagingSenderId: "504261803112",
    appId: "1:504261803112:web:07c8f3f46ab4078e804fdd",
    measurementId: "G-52K0YJXPJJ"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;