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
      <h1>NUS Lost & Found</h1>
    </div>
  
    <!-- Button Container at the Bottom -->
    <div class="button-container">
      <h1>Click here to login > ></h1>
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
  width: auto; /* Size determined by the content */
  height: auto;
  display: flex;
  justify-content: left;
  color: black;
}

.contact-container h1 {
  margin-left: 20px;
  font-size: 1em;
}

.contact-info {
  position: absolute;
  top: 35px;
  left: 10px; 
  font-size: 0.9em;
  background-color: #f0f0f0; 
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.web-title {
  display: flex;
  justify-content: right;
  font-weight: bold;
  font-family: Arial, sans-serif;
}

.web-title h1 {
  margin-top: 200px;
  margin-right: 20px;
  font-size: 3em;
  color: #0058b0;
}

.button-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background-color: #0058b0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-container h1 {
  color: white;
  font-size: 2em;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>