<template>
  <Sidebar />

  <div>
    <div class="home-container">
      <h1>NUS Lost & Found</h1>
      <p>* Only urgent items are displayed here</p>
    </div>

    <div class="highlighted-items">
      <h2>Highlighted Items</h2>
      <p>This would be a list of urgent items that are currently lost or found. 
        Need to integrate the database to display the items.</p>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Item</th>
              <th>Location</th>
              <th>Faculty</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in highlightedItems" :key="index" class="border-b">
              <td>{{ item.time }}</td>
              <td>{{ item.item }}</td>
              <td>{{ item.location }}</td>
              <td>{{ item.faculty }}</td>
              <td>{{ item.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "Home",
  
  components: {
    Sidebar,
  },

  data() {
    return {
      highlightedItems: [
        { time: "5 min", item: "Student ID card", location: "near Terrace", faculty: "SoC", status: "to be claimed" },
        { time: "46 min", item: "Identity card", location: "near LT27", faculty: "FoS", status: "to be claimed" },
        { time: "3 hrs", item: "Student ID card", location: "near LT18", faculty: "Biz", status: "to be found" },
        { time: "11 hrs", item: "Laptop", location: "near HSSML", faculty: "Biz", status: "to be found" },
        { time: "5 min", item: "Student ID card", location: "near Terrace", faculty: "SoC", status: "to be claimed" },
        { time: "46 min", item: "Identity card", location: "near LT27", faculty: "FoS", status: "to be claimed" },
        { time: "3 hrs", item: "Student ID card", location: "near LT18", faculty: "Biz", status: "to be found" },
        { time: "11 hrs", item: "Laptop", location: "near HSSML", faculty: "Biz", status: "to be found" },
        { time: "1 day", item: "Backpack", location: "near library", faculty: "SoC", status: "to be claimed" },
        { time: "2 hrs", item: "Wallet", location: "near FASS", faculty: "FoE", status: "to be found" },
        { time: "30 min", item: "Phone", location: "near CS Lab", faculty: "SoC", status: "to be claimed" },
        { time: "5 hrs", item: "Keychain", location: "near Bukit Timah", faculty: "Law", status: "to be claimed" },
        { time: "12 hrs", item: "Headphones", location: "near HSSML", faculty: "Biz", status: "to be claimed" },
        { time: "6 hrs", item: "Umbrella", location: "near LT15", faculty: "SoC", status: "to be found" }
      ]
    };
  }
}
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
  color: #0058b0;
  font-size: 3em;
  margin-bottom: 5px;
}

.home-container p {
  font-size: 1.2em;
  color: #727680;
}

.highlighted-items {
  margin-left: 260px;
  padding: 20px;
}

.highlighted-items h2 {
  color: #0058b0;
  font-size: 2em;
  margin-bottom: 5px;
}

.table-container {
  max-height: 400px; 
  overflow-y: auto;
}

table {
  width: 100%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-collapse: collapse;
}

thead {
  background-color: #e5e7eb;
}

th, td {
  padding: 8px;
  text-align: left;
}

tr {
  border-bottom: 1px solid #ddd;
}

tr:last-child {
  border-bottom: none;
}

</style>
