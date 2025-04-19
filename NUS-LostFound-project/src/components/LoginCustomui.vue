<template>
  <div class="login-container">
    <h1 class="login-title">Log in to your account</h1>
    <div class="login-box">
      <div v-if="statusMessage" :class="statusType + '-message'">{{ statusMessage }}</div>
      <form @submit.prevent="handleEmailPasswordLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <button type="button" @click="handleSignUp">Sign Up</button>
        <p>
          <span @click="handleForgotPassword" class="forgot-link">
            Forgot Password?
          </span>
        </p>
      </form>
      <hr />
      <button @click="loginWithGoogle">Login with Google</button>
    </div>
  </div>
</template>

<script>
import { auth } from "@/firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase.js";

export default {
  name: "CustomLogin",
  data() {
    return {
      email: "",
      password: "",
      statusMessage: "",
      statusType: "",
    };
  },
  methods: {
    getErrorMessage(error) {
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          return "Invalid email or password.";
        case "auth/email-already-in-use":
          return "This email is already registered.";
        case "auth/weak-password":
          return "Password is too weak. Please choose a stronger password.";
        case "auth/invalid-email":
          return "Invalid email address.";
        case "auth/popup-closed-by-user":
          return "Google sign-in was cancelled.";
        case "auth/network-request-failed":
          return "Network error. Please check your internet connection.";
        default:
          return "An error occurred. Please try again.";
      }
    },
    async handleSignUp() {
      this.statusMessage = "";
      this.statusType = "";
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;
        await setDoc(doc(db, "User", user.uid), {
          uid: user.uid,
          email: user.email,
          createdAt: serverTimestamp(),
        });
        this.$router.push("/home");
      } catch (error) {
        this.statusMessage = this.getErrorMessage(error);
        this.statusType = "error";
      }
    },
    async handleForgotPassword() {
      this.statusMessage = "";
      this.statusType = "";
      if (!this.email) {
        this.statusMessage = "Please enter your email address first.";
        this.statusType = "error";
        return;
      }
      try {
        await sendPasswordResetEmail(auth, this.email);
        this.statusMessage = "Password reset email sent! Please check your inbox.";
        this.statusType = "success";
      } catch (error) {
        this.statusMessage = this.getErrorMessage(error);
        this.statusType = "error";
      }
    },
    async handleEmailPasswordLogin() {
      this.statusMessage = "";
      this.statusType = "";
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;
        const userRef = doc(db, "User", user.uid);
        const docSnap = await getDoc(userRef);
        if (!docSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            createdAt: serverTimestamp(),
          });
        }
        this.$router.push("/home");
      } catch (error) {
        this.statusMessage = this.getErrorMessage(error);
        this.statusType = "error";
      }
    },
    async loginWithGoogle() {
      this.statusMessage = "";
      this.statusType = "";
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const userRef = doc(db, "User", user.uid);
        const docSnap = await getDoc(userRef);
        if (!docSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            createdAt: serverTimestamp(),
          });
        }
        this.$router.push("/home");
      } catch (error) {
        this.statusMessage = this.getErrorMessage(error);
        this.statusType = "error";
      }
    },
  },
};
</script>
<style scoped>
.error-message {
  color: red;
  margin-bottom: 10px;
}

.success-message {
  color: green;
  margin-bottom: 10px;
}
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  justify-content: center;
}

.login-title {
  margin-bottom: 30px;
  font-size: 2em;
  text-align: center;
}

.login-box {
  background-color: #bddbf8;
  padding: 40px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

input,
button {
  padding: 10px;
  font-size: 1em;
}

hr {
  width: 50%;
  border: 1px solid #ccc;
  margin: 30px auto;
}

.forgot-link {
  color: blue;
  cursor: pointer;
  text-decoration: underline;
}
</style>
