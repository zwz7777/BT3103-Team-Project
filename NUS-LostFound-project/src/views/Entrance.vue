<template>
    <!-- This is the entrance page before login -->
  
    <div class="contact-container" @click="toggleInfo">

      <h1>Contact Us</h1>
      <div v-if="showContactInfo" class="contact-info">
        <p>Email: support@example.com</p>
        <p>Phone: +65 1234 5678</p>
      </div>
      
    </div>
  
    <!-- Main Title -->
    <div class="web-title">
      <h2>NUS Lost & Found</h2>
      <h1><router-link to="/login" class="hover-link">Here to Login > ></router-link></h1>

    </div>

    <!-- Bottom -->
    <div class="bottom">
    </div>
  
</template>

<script>
export default {
  name: "Entrance",
  data() {
    return {
      showContactInfo: false,
    };
  },
  methods: {
    toggleInfo() {
      this.showContactInfo = !this.showContactInfo;
    },

  },
};
</script>

<style scoped>
.contact-container {
  position: absolute;
  top: 5px;
  left: 10px; 
  width: auto;
  height: auto;
  display: flex;
  justify-content: left;
  color: black;
}

.contact-container h1 {
  margin-left: 20px;
  font-size: 1.5em;
}

.contact-info {
  position: absolute;
  top: 50px;
  left: 10px; 
  font-size: 1em;
  background-color: #f0f0f0; 
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.web-title {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-weight: bold;
  font-family: Arial, sans-serif;
}

.web-title h2 {
  margin-top: 200px;
  margin-right: 30px;
  font-size: 4em;
  color: #0058b0;
}


.web-title h1 {
  color: rgb(255, 0, 195);
  font-size: 1.8em;
  margin-top: 50px;
  margin-right: 50px;
}

.hover-link:hover {
  color: rgb(166, 0, 255); 
}


.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background-color: #0058b0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>