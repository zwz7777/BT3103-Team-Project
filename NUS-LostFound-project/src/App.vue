<template>
  <div id="app">
    <Sidebar />
    <div class="main-container">
      <Entrance />
      <ReportLostItems />
      <div class="main-content">
        <router-view />
      </div>
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
</style>