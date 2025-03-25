<script setup>
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <div id ="app">
    <Sidebar />
    <div class="main-content">
      <router-view/>
    </div>
  </div>
  
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header> -->

  <!-- <main>
    <TheWelcome />
  </main> -->
</template>

<style scoped>
#app {
  display: flex;
}

.main-content {
  margin-left: 250px; /* To make space for the sidebar */
  padding: 20px;
  width: 100%;
  min-height: 100vh;
}
</style>