<template>
    <div class="login-container">
        <h2>Login</h2>
        <div id="firebaseui-auth-container"></div>
    </div>
  </template>
  
  <script>
  import firebase from '@/uifire.js'
  import { db } from '@/firebase.js'
  import 'firebase/compat/auth';
  import * as firebaseui from 'firebaseui';
  import 'firebaseui/dist/firebaseui.css';
  import { serverTimestamp, doc, getDoc, setDoc } from 'firebase/firestore';
  
  export default {
    name: 'Login',

    mounted() {

        var ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }
        var uiConfig = {
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
            callbacks: {
              signInSuccessWithAuthResult: async (authResult) => {
                const user = authResult.user;

                try {
                  if (user) {
                    const userRef = doc(db, 'User', user.uid);
                    const docSnap = await getDoc(userRef);

                    if (!docSnap.exists()) {
                      // Update Firestore before any navigation
                      await setDoc(userRef, {
                        uid: user.uid,
                        email: user.email,
                        createdAt: serverTimestamp(),
                      });
                      console.log('Firestore updated successfully');
                      // console.log(user)
                    }

                    // Manually navigate after Firestore update
                    this.$router.push('/home'); 
                  }
                } catch (error) {
                  console.error('Error updating Firestore:', error);
                }

                return false; // Prevent automatic redirect by FirebaseUI
              },
            },
          };
        ui.start('#firebaseui-auth-container', uiConfig);

    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
  }
  h2 {
    margin-bottom: 20px;
    font-size: 2em;
  }
  .welcome-container {
    text-align: center;
  }
  .welcome-container h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
  }
  .welcome-container p {
    font-size: 1.2em;
  }
  </style>
