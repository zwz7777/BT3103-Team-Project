<template>
    <div class="login-container">
      <h2>Log in to your account</h2>
      <form @submit.prevent="handleEmailPasswordLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <button type="button" @click="handleSignUp">Sign Up</button>
        <p>
            <span @click="handleForgotPassword" style="color: blue; cursor: pointer; text-decoration: underline;">
                Forgot Password?
            </span>
        </p>
      </form>
      <hr />
      <button @click="loginWithGoogle">Login with Google</button>
    </div>
  </template>
  <script>
  import { auth } from '@/firebase.js';  // Or wherever you've stored it
  import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
  import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
  import { db } from '@/firebase.js';
  
  export default {
    name: "CustomLogin",
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
        async handleSignUp() {
            try {
            const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
            const user = userCredential.user;
            // Then handle Firestore data, route changes, etc.
            } catch (error) {
            console.error('Error with sign-up:', error);
            }
        },
        async handleForgotPassword() {
        if (!this.email) {
            alert('Please enter your email address first.');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, this.email);
            alert('Password reset email sent! Please check your inbox.');
        } catch (error) {
            console.error('Error sending password reset email:', error);
            alert('Error: ' + error.message);
        }
        },
      async handleEmailPasswordLogin() {
        try {
          // Sign in the user
          const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
          const user = userCredential.user;
  
          // Check if user doc exists in Firestore
          const userRef = doc(db, 'User', user.uid);
          const docSnap = await getDoc(userRef);
          if (!docSnap.exists()) {
            await setDoc(userRef, {
              uid: user.uid,
              email: user.email,
              createdAt: serverTimestamp(),
            });
          }
  
          // Navigate to home after sign-in
          this.$router.push('/home');
        } catch (error) {
          console.error('Error with email/password sign-in:', error);
        }
      },
  
      async loginWithGoogle() {
        try {
          // Create a Google provider object
          const provider = new GoogleAuthProvider();
          
          // Sign in with Popup
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
  
          // Check if user doc exists in Firestore
          const userRef = doc(db, 'User', user.uid);
          const docSnap = await getDoc(userRef);
          if (!docSnap.exists()) {
            await setDoc(userRef, {
              uid: user.uid,
              email: user.email,
              createdAt: serverTimestamp(),
            });
          }
  
          // Navigate to home after sign-in
          this.$router.push('/home');
        } catch (error) {
          console.error('Error with Google sign-in:', error);
        }
      },
    },
  };
  </script>
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    margin-top: 100px;
  }

  h2 {
    margin-bottom: 20px;
    font-size: 2em;
  }

  hr {
    width: 30%;
    border: 1px solid #ccc;
    margin: 20px 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  </style>