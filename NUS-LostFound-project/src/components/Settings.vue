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
            Account: {{ account }}
        </p>
        <div class="editForm">
            <h2>Edit Profile</h2>
            <form id="userForm">

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
            account: ""
        };
    },
    methods: {

        async setData() {
            const userRef = doc(db, "User", "testdata");
            await setDoc(userRef, {
                account: "E1234567@u.nus.edu",
                nickname: "Shank",
                phoneNumber: "00000000",
                telegram: "@Shank"
            });
            console.log("Document written with ID testdata");
        },
        async fetchData() {
            const userRef = doc(db, "User", "testdata");
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                this.account = docSnap.data().account;

            } else {
                console.log("No such document!");
            }
        },

        async editProfile() {
            //need to get data from db based on account

            //update new account
            console.log("IN AC")
            let account = this.account;
            let nickname = document.getElementById("nickname").value;
            let phoneNumber = document.getElementById("phoneNumber").value;
            let telegram = document.getElementById("telegram").value;
            alert(" Updating your data : " + account);
            try {
                await setDoc(doc(db, "User", account), {
                    Nickname: nickname,
                    PhoneNumber: phoneNumber,
                    Telegram: telegram
                }, { merge: true });

                console.log("Document updated for account: ", account);
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