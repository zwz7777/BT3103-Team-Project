<template>
   <Settings /> # Will be in separate page require router navigation in the final product, currently for testing
</template>

<script>
import Settings from './components/Settings.vue';

export default {
  name: 'App',
  components: {
    Settings
  },
};
</script>

<style>
/* Optional global styles */
#app {
  min-height: 100vh;
}
</style>