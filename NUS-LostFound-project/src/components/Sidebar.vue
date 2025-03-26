<template>
    <div class="sidebar">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/reportlost">Report Lost Items</router-link></li>
        <li><router-link to="/lostpage">Lost Item List</router-link></li>
        <li><router-link to="/foundpage">Found Item List</router-link></li>
        <li><router-link to="/settings">Settings</router-link></li>
      </ul>
    </div>
  </template>
  
  <style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: rgba(0, 85, 255, 0.74);
  padding-top: 20px;
  position: fixed;
  top: 0;
  left: 0;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 15px;
  text-align: left; 
}

a {
  text-decoration: none;
  color: white; 
  display: block; 
  padding: 10px; 
}

a:hover {
  background-color: darkblue; 
}
</style>