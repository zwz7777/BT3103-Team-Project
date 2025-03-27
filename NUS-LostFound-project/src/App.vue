<template>
  <Entrance />
  <Login /> # Will be in separate page require router navigation in the final product, currently for testing
  <Sidebar />
  <ReportLostItems />
   <div class="main-content">
     <router-view/>
   </div>
</template>

<script>
import Login from '@/components/Login.vue';
import ReportLostItems from './views/ReportLostItems.vue';
import Entrance from './views/Entrance.vue';
import Sidebar from './components/Sidebar.vue';

export default {
 name: 'App',
 components: {
   Login,
   Entrance,
   ReportLostItems
 },
};
</script>

<style>
/* Optional global styles */
#app {
 min-height: 100vh;
}
</style>