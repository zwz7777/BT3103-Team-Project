<template>
   <Home />
   <Login /> # Will be in separate page require router navigation in the final product, currently for testing
   <Sidebar />
    <div class="main-content">
      <router-view/>
    </div>
</template>

<script>
import Login from '@/components/Login.vue';
import Home from './views/Home.vue';

export default {
  name: 'App',
  components: {
    Login,
    Home,
  },
};
</script>

<style>
/* Optional global styles */
#app {
  min-height: 100vh;
}
</style>