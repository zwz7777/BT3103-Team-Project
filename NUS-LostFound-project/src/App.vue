<template>
  <div id="app">
    <Sidebar />
    <div class="main-container">
        <router-view />
    </div>
    <div class="main-content">
      <Entrance />
      <ReportLostItems />
    </div>
  </div>
</template>

<script>
import ReportLostItems from './views/ReportLostItems.vue';
import Entrance from './views/Entrance.vue';
import Sidebar from './components/Sidebar.vue';

export default {
 name: 'App',
 components: {
   Entrance,
   ReportLostItems,
   Sidebar
 },
};
</script>

<style>
/* Optional global styles */
#app {
  display: flex;
  min-height: 100vh;
}
.main-container {
  flex: 1;
  margin-left: 250px;  /* Make room for sidebar */
  padding: 20px;
}
</style>