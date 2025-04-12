<template>
    <div>
      <!-- <h1>Welcome to the Login Page</h1> -->
      <Login />
    </div>
  </template>
<script>
  import Login from '@/components/LoginCustomui.vue';

  export default {
    name:"LoginPage", 
    components: {
      Login
    },
  }
</script>

<style scoped>
h1{
  text-align: center;
  margin-top: 50px;
}
</style>