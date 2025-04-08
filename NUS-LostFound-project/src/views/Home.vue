<template>
  <Sidebar />

  <div>
    <div class="home-container">
      <h1>NUS Lost & Found</h1>
      <p>* Only urgent items are displayed here</p>
      <p>* Both lost and found items are included</p>
    </div>

    <div class="highlighted-items">
      <h2>Highlighted Items</h2>
      <br />

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Item Details</th>
              <th>Location</th>
              <th>Faculty</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in highlightedItems" :key="index" class="border-b">
              <td>{{ item.time }}</td>
              <td>{{ item.description }}</td>
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
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

export default {
  name: "Home",

  components: {
    Sidebar,
  },

  data() {
    return {
      highlightedItems: [],
    };
  },

  async mounted() {
    try {
      const items = [];

      // Get each item
      const processItems = async (collectionName) => {
        const snapshot = await getDocs(collection(db, collectionName));
        snapshot.forEach((doc) => {
          const data = doc.data();
          const urgency = Number(data.urgency);
          
          if (urgency >= 6) {
            items.push({
              time: data.timestamp?.toDate().toLocaleString() || "N/A",
              description: data.category + ": " + data.description || "N/A",
              location: data.location || "N/A",
              faculty: data.faculty || "N/A",
              status: collectionName === "foundItems" ? "Found" : "Lost",
            });
          }
        });
      };

      // Both foundItems and lostItems
      await Promise.all([
        processItems("foundItems"),
        processItems("lostItems"),
      ]);

      items.sort((a, b) => b.status - a.status);

      this.highlightedItems = items;
    } catch (error) {
      console.error("Error fetching urgent items:", error);
    }
  }
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
