<template>
  <div>
    <Sidebar />

    <div class="home-container">
      <h1>NUS Lost & Found</h1>
      <p>* Only urgent items are displayed here.</p>
    </div>

    <div class="highlighted-items">
      <h2>Highlighted Items</h2>
      <p>This would be a list of urgent items that are currently lost or found. Need to integrate the database to display the items.</p>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: "Home",
  components: {
    Sidebar,
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  min-height: 20vh;
  padding: 20px;
  margin-left: 260px; /* Same margin as sidebar*/
}

.home-container h1 {
  color: #185be1;
  font-size: 3em;
  margin-bottom: 5px;
}

.home-container p {
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #727680;
}

.highlighted-items {
  margin-left: 260px; /* Same as home-container*/
  padding: 20px;
}

.highlighted-items h2 {
  color: #185be1;
  font-size: 2em;
  margin-bottom: 5px;
}
</style>
` `