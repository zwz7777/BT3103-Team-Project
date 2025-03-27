<template>
    <div>
      <h1>Welcome to the Login Page</h1>
      <Login />
    </div>
  </template>
<script>
  import Login from '@/components/Login.vue';

  export default {
    name:"LoginPage", 
    components: {
      Login
    },
  }
</script>