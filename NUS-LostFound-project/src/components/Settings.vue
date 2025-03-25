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
            <img src="pikachu.webp">
        </div>
    </div>
    <div>
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

                <button id="button" type="button">Submit Edit</button> <br /><br />
            </form>
        </div>
    </div>
    <h2>Change Password</h2>
    <button id="button" type="button">Click here</button>

    <h2>Log Out</h2>
    <button id="button" type="button">Click here</button>
</template>

<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    box-sizing: border-box;
}

.Settings {
    flex: 6;
    font-size: 20px;
}

.profile {
    flex: 1;
    text-align: right;
}

.picture {
    flex: 1;
    margin-left: 20px;
    align-items: center;
    justify-content: center;
}

img {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    border: 1px solid #ccc;
}

#profileHeading {
    margin-bottom: 10px;
    font-size: 20px;
}

label {
    font-weight: bold;
}

button {
    padding: 8px 16px;
    background-color: #0052cc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>

<script>

</script>