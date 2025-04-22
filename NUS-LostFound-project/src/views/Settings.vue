<!-- Modified version, mainly changes on class names for css -->
<template>
  <Sidebar />
  <div class="container">
    <!-- Settings Header -->
    <div class="settings-header">
      <h1>Settings</h1>
      <br />
    </div>

    <!-- Profile Info Section -->
    <div class="profile-info">
      <h2>Personal Information</h2>
      <p>
        <!-- Account: {{ uid }} <br /><br /> -->
        Email Address: {{ email }} <br /><br />
        Nickname: {{ nickname }} <br /><br />
        Phone Number: {{ phoneNumber }} <br /><br />
        Telegram: {{ telegram }} <br /><br />
      </p>

      <div class="edit-button">
        <button @click="showEditModal = true">Edit Profile</button>
      </div>

      <!-- Edit Modal -->
      <EditProfileModal
        v-if="showEditModal"
        :uid="uid"
        :initialEmail="email"
        :initialNickname="nickname"
        :initialPhoneNumber="phoneNumber"
        :initialTelegram="telegram"
        @close="showEditModal = false"
        @profile-updated="handleProfileUpdated"
      />
    </div>

    <!-- Settings Options -->
    <div class="account-settings">
      <div class="settings-box">
        <ChangePassWordModal />
      </div>

      <div class="settings-box">
        <Logout />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.profile-info {
  background-color: #ebf1f9;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
}

.account-settings {
  display: flex;
  gap: 20px; 
  justify-content: center; 
  align-items: center; 
  margin-top: 20px;
}

.settings-box {
  background-color: #fff;
  padding: 1rem;
  margin: 2rem;
  max-width: 600px;
  text-align: center;
}

.edit-button {
  margin-top: 1rem;
}

p {
  text-align: left;
}

</style>

<script>
import firebaseApp from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import Logout from "@/components/Logout.vue";
import Sidebar from "@/components/Sidebar.vue";
import ChangePassWordModal from "@/components/ChangePassWord.vue";
import EditProfileModal from "@/components/EditProfile.vue";
const db = getFirestore(firebaseApp);

export default {
  data() {
    return {
      uid: "",
      email: "",
      nickname: "",
      phoneNumber: "",
      telegram: "",
      showEditModal: false,
    };
  },
  components: {
    Logout,
    Sidebar,
    ChangePassWordModal,
    EditProfileModal,
  },
  methods: {
    async fetchData() {
      const userRef = doc(db, "User", this.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        this.email = data.email || "";
        this.nickname = data.nickname || "";
        this.phoneNumber = data.phoneNumber || "";
        this.telegram = data.telegram || "";
      } else {
        console.log("No such document!");
      }
    },
    handleProfileUpdated() {
      this.fetchData();
      this.showEditModal = false;
    },
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        this.fetchData();
      } else {
        console.log("No user is logged in.");
      }
    });
  },
};
</script>
