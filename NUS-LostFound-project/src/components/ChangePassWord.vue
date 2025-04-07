<template>
    <div>
      <!-- Settings Page Button -->
      <button id="button" type="button" @click="openModal">Click Here</button>
  
      <!-- Modal -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <h2>Change Password</h2>
          <br />
          <form @submit.prevent="handleChangePassword">
            <div>
              <label>Current Password:  </label>
              <input type="password" v-model="currentPassword" required />
            </div>
            <br />
            <div>
              <label>New Password:    </label>
              <input type="password" v-model="newPassword" required />
            </div>
            <br />
            <div class="modal-buttons">
              <button type="submit">Submit</button>
              <button type="button" @click="closeModal">Cancel</button>
            </div>
          </form>
          <p v-if="message" style="color: green;">{{ message }}</p>
          <p v-if="error" style="color: red;">{{ error }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
  
  export default {
    name: 'ChangePasswordModal',
    data() {
      return {
        showModal: false,
        currentPassword: '',
        newPassword: '',
        message: '',
        error: '',
      };
    },
    methods: {
      openModal() {
        this.showModal = true;
        this.message = '';
        this.error = '';
        this.currentPassword = '';
        this.newPassword = '';
      },
      closeModal() {
        this.showModal = false;
      },
      async handleChangePassword() {
        const auth = getAuth();
        const user = auth.currentUser;
  
        if (!user) {
          this.error = "No user is signed in.";
          return;
        }
  
        try {
          const credential = EmailAuthProvider.credential(user.email, this.currentPassword);
  
          // Reauthenticate first
          await reauthenticateWithCredential(user, credential);
  
          // Then update password
          await updatePassword(user, this.newPassword);
  
          this.message = "Password changed successfully!";
          this.error = '';
          this.closeModal(); // Close modal after success
        } catch (err) {
          this.error = err.message;
          this.message = '';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Basic Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Dark background */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 400px;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
  
  .modal-buttons button {
    padding: 0.5rem 1rem;
  }
  </style>
  