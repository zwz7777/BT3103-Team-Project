<template>
  <button @click="logOut()" v-if="user"> Click Here </button>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
    name: "Logout",
    data() {
        return {
            user: false,
        };
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        });
    },
    
    methods: {
        logOut() {
            const auth = getAuth();
            const user = auth.currentUser;
            signOut(auth, user)
            this.$router.push({ name: "Login" });
        },
    },
}
</script>