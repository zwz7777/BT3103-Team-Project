<template>
    <Sidebar />
    <div class="container">
        <div class="Settings">
            <h1>Settings</h1>
        </div>

    </div>
    <!--
    <div class="container">
        <Logout />
    </div>
    -->
    <div class="container">
        <h1>Personal information</h1>
        <p>
            <!--
            Account: {{ uid }} <br><br>
            -->
            Email Address: {{ email }} <br><br>
            Nickname: {{ nickname }} <br><br>
            Phone Number: {{ phoneNumber }} <br><br>
            Telegram: {{ telegram }} <br><br>
        </p>

        <div class="save">
            <button @click="showEditModal = true">Edit Profile</button>
        </div>

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
        <!-- <div class="editForm">
            <h2>Edit Profile</h2>
            <form id="userForm">
                <label for="email">Email Address: </label>
                <input type="text" id="email" required=" " placeholder="EXXXXXXX@u.nus.edu" />
                <br /><br />

                <label for="nickname">Nickname: </label>
                <input type="text" id="nickname" required=" " placeholder="Enter your nickname" />
                <br /><br />

                <label for="phoneNumber">Phone Number: </label>
                <input type="text" id="phoneNumber" required=" " placeholder="XXXXXXXX" pattern="\d{8}$"
                    maxlength="8" />
                <br /><br />

                <label for="telegram">Telegram Handle: </label>
                <input type="text" id="telegram" required=" " placeholder="@xxxxx" />
                <br /><br />

                <div class="save">
                    <button id="savebutton" type="button" v-on:click="editProfile"> Save </button>
                </div>
            </form>
        </div> -->
    </div>

    <div class="container"> 
        <h2>Change Password</h2>
        <ChangePassWordModal />

        <h2>Log Out</h2>
        <Logout />
        <!-- <button id="button" type="button">Click here</button> -->
    </div>
    
</template>

<style scoped>
.editForm {
    display: inline-block;
    text-align: right;
}

.container {
    flex-direction: column;
}

.save {
    text-align: center;
}
</style>

<script>
import firebaseApp from '../firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import Logout from '@/components/Logout.vue';
import Sidebar from "@/components/Sidebar.vue";
import ChangePassWordModal from "@/components/ChangePassWord.vue";
import EditProfileModal from "@/components/EditProfile.vue";
const db = getFirestore(firebaseApp)

export default {
    data() {
        return {
            uid: "",
            email: "",
            nickname: "",
            phoneNumber: "",
            telegram: "",
            showEditModal: false
        };
    },
    components: {
        Logout,
        Sidebar,
        ChangePassWordModal,
        EditProfileModal
    },
    methods: {
        /*
        async setData() {
            const userRef = doc(db, "User", this.uid);
            await setDoc(userRef, {
                uid: this.uid,
                email: "",
                //nickname: "",
                //phoneNumber: "",
                //telegram: ""
            });
            console.log("Document written");
        },
        */
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
        // async editProfile() {
        //     console.log("IN AC");
        //     console.log("Current UID:", this.uid);

        //     const emailInput = document.getElementById("email").value;
        //     const nicknameInput = document.getElementById("nickname").value;
        //     const phoneNumberInput = document.getElementById("phoneNumber").value;
        //     const telegramInput = document.getElementById("telegram").value;

        //     const updatedData = {};

        //     if (emailInput && emailInput !== this.email) updatedData.email = emailInput;
        //     if (nicknameInput && nicknameInput !== this.nickname) updatedData.nickname = nicknameInput;
        //     if (phoneNumberInput && phoneNumberInput !== this.phoneNumber) updatedData.phoneNumber = phoneNumberInput;
        //     if (telegramInput && telegramInput !== this.telegram) updatedData.telegram = telegramInput;

        //     if (Object.keys(updatedData).length === 0) {
        //         alert("No changes detected.");
        //         return;
        //     }

        //     alert("Updating your data: " + this.uid);

        //     try {
        //         await setDoc(doc(db, "User", this.uid), updatedData, { merge: true });
        //         console.log("Document updated for account:", this.uid);
        //         await this.fetchData();
        //         document.getElementById('userForm').reset();
        //     } catch (error) {
        //         console.error("Error updating document: ", error);
        //     }
        // }
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
    }
};
</script>