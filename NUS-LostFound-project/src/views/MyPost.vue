<template>
    <Sidebar />
    <div class="My_post">
      <!-- Your content goes here -->
    </div>
  </template>
  
  <script>
  import Sidebar from '@/components/Sidebar.vue';
  
  export default {
    name: 'MyPost',

    components: {
    Sidebar,
  },
  };
  </script>
  
  
  <style scoped>
  .blank-page {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  </style>