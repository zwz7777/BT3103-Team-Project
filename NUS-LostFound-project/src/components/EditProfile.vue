<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2>Edit Profile</h2>
      <form id="userForm">
        <label for="email">Email Address: </label>
        <input type="text" id="email" required placeholder="EXXXXXXX@u.nus.edu" v-model="form.email" />
        <br /><br />

        <label for="nickname">Nickname: </label>
        <input type="text" id="nickname" required placeholder="Enter your nickname" v-model="form.nickname" />
        <br /><br />

        <label for="phoneNumber">Phone Number: </label>
        <input type="text" id="phoneNumber" required placeholder="XXXXXXXX" pattern="\d{8}$" maxlength="8" v-model="form.phoneNumber" />
        <br /><br />

        <label for="telegram">Telegram Handle: </label>
        <input type="text" id="telegram" required placeholder="@xxxxx" v-model="form.telegram" />
        <br /><br />

        <div class="save">
          <button type="button" @click="close">Cancel</button>
          <button type="button" @click="saveProfile">Save</button>
        </div>
        
      </form>
    </div>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  props: {
    uid: String,
    initialEmail: String,
    initialNickname: String,
    initialPhoneNumber: String,
    initialTelegram: String
  },
  data() {
    return {
      form: {
        email: this.initialEmail,
        nickname: this.initialNickname,
        phoneNumber: this.initialPhoneNumber,
        telegram: this.initialTelegram
      }
    };
  },
  methods: {
    async saveProfile() {
      const updatedData = {};

      if (this.form.email && this.form.email !== this.initialEmail) updatedData.email = this.form.email;
      if (this.form.nickname && this.form.nickname !== this.initialNickname) updatedData.nickname = this.form.nickname;
      if (this.form.phoneNumber && this.form.phoneNumber !== this.initialPhoneNumber) updatedData.phoneNumber = this.form.phoneNumber;
      if (this.form.telegram && this.form.telegram !== this.initialTelegram) updatedData.telegram = this.form.telegram;

      if (Object.keys(updatedData).length === 0) {
        alert("No changes detected.");
        return;
      }

      try {
        await setDoc(doc(db, "User", this.uid), updatedData, { merge: true });
        alert("Profile updated!");
        this.$emit('profile-updated');
        this.close();
      } catch (error) {
        console.error("Error updating profile: ", error);
      }
    },
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
}

.save {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
