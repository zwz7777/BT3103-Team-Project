

<template>
   <Home />
   <Login /> # Will be in separate page require router navigation in the final product, currently for testing
   <ReportLostItems />
</template>

<script>
import Login from '@/components/Login.vue';
import Home from './components/Home.vue';
import ReportLostItems from './views/ReportLostItems.vue';

export default {
  name: 'App',
  components: {
    Login,
    Home,
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