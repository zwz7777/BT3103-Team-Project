<template>
  <div class="login-container">
      <h2>Login</h2>
      <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import firebase from '@/uifire.js'
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

export default {
  name: 'Login',

  mounted() {

      var ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
          ui = new firebaseui.auth.AuthUI(firebase.auth());
      }
      var uiConfig = {
          signInSuccessUrl: '/',
          signInOptions: [
              firebase.auth.EmailAuthProvider.PROVIDER_ID,
          ]
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
  justify-content: center;
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