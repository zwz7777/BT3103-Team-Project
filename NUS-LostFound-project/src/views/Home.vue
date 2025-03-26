<template>
  <div>
    <!-- Website Header and Menu Bar -->
    <header>
      <div class="logo">
        <h1>NUS Lost & Found</h1>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
/* Styles for Header */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 10px 20px;
  color: white;
}

.logo h1 {
  margin: 0;
}
</style>
