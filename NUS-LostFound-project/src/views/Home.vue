<template>
  <div>
    <!-- Website header and enter button -->
    <header>
      <div class="logo">
        <h1>NUS Lost & Found</h1>
      </div>
    </header>

    <div class = "enter">
      <h1>Report Lost Items</h1>
      <p>Click here to report lost items.</p>
      <router-link to="/ReportLost">Report Lost Item</router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  color: #0058b0;
}

.enter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0058b0;
  padding: 10px 20px;
  color: white;
}

.enter h1 {
  margin: 0;
}

.logo h1 {
  margin: 0;
}
</style>
