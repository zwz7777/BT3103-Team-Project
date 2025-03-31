<template>
    <div class="container">
        <div class="Settings">
            <h1>Settings</h1>
        </div>

        <div class="profile">
            <h1 id="profileHeading">Your Profile</h1>
            <button id="button" type="button" @click="setData">Change</button>
        </div>

        <div class="picture">
            <button id="button" type="button" @click="getData">get</button>
        </div>
    </div>
    <div class="container">
        <h1>Personal information</h1>
        <p>
            Account: {{ id }} <br><br>
            Email Address: {{ email }} <br><br>
            Nickname: {{ nickName }} <br><br>
            Phone Number: {{ phoneNumber }} <br><br>
            Telegram: {{ telegram }} <br><br>
        </p>
        <div class="editForm">
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
        </div>
    </div>
    <h2>Change Password</h2>
    <button id="button" type="button">Click here</button>

    <h2>Log Out</h2>
    <button id="button" type="button">Click here</button>
</template>

<style scoped></style>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore, doc, setDoc, getDocs, collection, getDoc } from "firebase/firestore";
const db = getFirestore(firebaseApp)

export default {
    data() {
        return {
            id: "testID",
            email: "E1234567@u.nus.edu",
            nickname: "",
            phoneNumber: "",
            telegram: ""
        };
    },
    methods: {
        async setData() {
            const userRef = doc(db, "User", this.id);
            // const userRef = doc(db, "User", user.uid);
            await setDoc(userRef, {
                email: "E1234567@u.nus.edu",
                nickname: "",
                phoneNumber: "",
                telegram: ""
            });
            console.log("Document written");
        },
        async fetchData() {
            const userRef = doc(db, "User", this.id);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                this.email = docSnap.data().email;
                this.nickName = docSnap.data().nickname;
                this.phoneNumber = docSnap.data().phoneNumber;
                this.telegram = docSnap.data().telegram;
            } else {
                console.log("No such document!");
            }
        },

        async editProfile() {
            console.log("IN AC");

            const emailInput = document.getElementById("email").value;
            const nicknameInput = document.getElementById("nickname").value;
            const phoneNumberInput = document.getElementById("phoneNumber").value;
            const telegramInput = document.getElementById("telegram").value;

            const updatedData = {};

            if (emailInput && emailInput !== this.email) updatedData.email = emailInput;
            if (nicknameInput && nicknameInput !== this.nickname) updatedData.nickname = nicknameInput;
            if (phoneNumberInput && phoneNumberInput !== this.phoneNumber) updatedData.phoneNumber = phoneNumberInput;
            if (telegramInput && telegramInput !== this.telegram) updatedData.telegram = telegramInput;

            if (Object.keys(updatedData).length === 0) {
                alert("No changes detected.");
                return;
            }

            alert("Updating your data: " + this.id);

            try {
                await setDoc(doc(db, "User", this.id), updatedData, { merge: true });
                console.log("Document updated for account:", this.id);
                document.getElementById('userForm').reset();
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        }

    },
    mounted() {
        this.fetchData();
    }
};
</script>