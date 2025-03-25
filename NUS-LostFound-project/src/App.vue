<template>
  <div id="app">
    <Login />
  </div>
</template>

<script>
import Login from '@/components/Login.vue';

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