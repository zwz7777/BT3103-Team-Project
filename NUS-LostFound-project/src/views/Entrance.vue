<template>
    <!-- This is the entrance page before login -->
    <div>
      <header>
        <div class="logo">
          <h1>NUS Lost & Found</h1>
        </div>
      </header>
    </div>
  </template>
  
  <script>
  export default {
    name: "Home"
  };
  </script>

  <style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    color: #0058b0;
  }
  
  .enter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #0058b0;
    padding: 10px 20px;
    color: white;
  }
  
  .enter h1 {
    margin: 0;
  }
  
  .logo h1 {
    margin: 0;
  }
  </style>
