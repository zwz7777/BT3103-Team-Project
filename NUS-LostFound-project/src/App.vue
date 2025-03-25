

<template>
   <Home />
   <Login />

    
  </main>
</template>

<script>
import Login from '@/components/Login.vue';
import Home from './components/Home.vue';

export default {
  name: 'App',
  components: {
    Login,
  },
};
</script>

<style>
/* Optional global styles */
#app {
  min-height: 100vh;
}
</style>