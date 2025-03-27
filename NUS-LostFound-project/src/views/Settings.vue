<template>
  <div class="container">
      <div class="Settings">
          <h1>Settings</h1>
      </div>

      <div class="profile">
          <h1 id="profileHeading">Your Profile</h1>
          <button id="button" type="button">Change</button>
      </div>

      <div class="picture">

      </div>
  </div>
  <div class="container">
      <h2>Personal information</h2>
      <div class="editForm">
          <form id="userForm">
              <label for="account">Account: </label>
              <input type="text" id="account" required=" " placeholder="E*******@u.nus.edu" />
              <br /><br />

              <label for="nickname">Nickname: </label>
              <input type="text" id="nickname" required=" " placeholder="Enter your nickname" />
              <br /><br />

              <label for="phoneNumber">Phone Number: </label>
              <input type="text" id="phoneNumber" required=" " placeholder="XXXXXXXX" pattern="\d{8}$"
                  maxlength="8" />
              <br /><br />

              <label for="telegram">Telegram Handle: </label>
              <input type="number" id="telegram" required=" " placeholder="@xxxxx" />
              <br /><br />

              <div class="save">
                  <button id="savebutton" type="button" v-on:click="editProfile"> Edit Profile </button>
              </div>
          </form>
      </div>
  </div>
  <h2>Change Password</h2>
  <button id="button" type="button">Click here</button>

  <h2>Log Out</h2>
  <button id="button" type="button">Click here</button>
</template>

<style scoped>
.editForm {
display: inline-block;
text-align: right;
}

.container {
display: flex;
width: 100%;
flex-direction: column;
}

.save {
text-align: center;
}
</style>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp)

export default {
  methods: {
      async editProfile() {
          //need to get data from db based on account

          //update new account
          console.log("IN AC")
          let account = document.getElementById("account").value;
          let nickname = document.getElementById("nickname").value;
          let phoneNumber = document.getElementById("phoneNumber").value;
          let telegram = document.getElementById("telegram").value;
          alert(" Updating your data : " + account);
          try {
              const docRef = await setDoc(doc(db, "User", account), {
                  Account: account, Nickname: nickname, PhoneNumber: phoneNumber, Telegram: telegram
              })
              console.log(docRef)
              document.getElementById('userForm').reset();
              //this.$emit("added")
          } catch (error) {
              console.log("Error adding document: ", error)
          }
      }
  }
}
</script>