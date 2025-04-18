<template>
  <Sidebar />
  <div class="container">
    <!-- Filter Section -->
    <div class="filter-section">
      <label for="color-filter">Color: </label>
      <select v-model="selectedColor" id="color-filter">
        <option value="">All</option>
        <option v-for="color in uniqueColors" :key="color" :value="color">{{ color }}</option>
      </select>

      <label for="faculty-filter">Faculty: </label>
      <select v-model="selectedFaculty" id="faculty-filter">
        <option value="">All</option>
        <option v-for="faculty in uniqueFaculties" :key="faculty" :value="faculty">{{ faculty }}</option>
      </select>
    </div>

    <h1 class="title">Lost Items</h1>
    <div class="items-wrapper">
      <div v-for="item in filteredItems" :key="item.id" class="item-bar">
        <!-- First Line: Category, Color, Faculty -->
        <div class="keywords">
          <span v-if="item.category" class="keyword">Category: {{ item.category }}</span>
          <span v-if="item.color" class="keyword">Color: {{ item.color }}</span>
          <span v-if="item.faculty" class="keyword">Faculty: {{ item.faculty }}</span>
        </div>

        <!-- Second Line: Location -->
        <p class="location">Location: {{ item.location }}</p>

        <!-- Third Line: Description -->
        <p class="description">Description: {{ item.description }}</p>

        <!-- Button to trigger notification -->
        <button @click="handleSendContact(item)">Send Notification</button>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import { sendNotification } from '@/services/notificationService';

import { collection} from 'firebase/firestore';
import { db } from '@/firebase.js';
import { onSnapshot } from 'firebase/firestore';


export default {
  name: 'LostPage',

  components: {
    Sidebar,
  },
  data() {
    return {
      selectedColor: '',
      selectedFaculty: '',
      lostItems: [],
      notificationCooldown: null,
      countdownInterval: null
    };
  },

  computed: {
    uniqueColors() {
      const colors = new Set(this.lostItems.map(item => item.color).filter(Boolean));
      return Array.from(colors);
    },
    uniqueFaculties() {
      const faculties = new Set(this.lostItems.map(item => item.faculty).filter(Boolean));
      return Array.from(faculties);
    },
    filteredItems() {
      return this.lostItems.filter(item => {
        const matchesColor = this.selectedColor ? item.color === this.selectedColor : true;
        const matchesFaculty = this.selectedFaculty ? item.faculty === this.selectedFaculty : true;
        return matchesColor && matchesFaculty;
      });
    },
  },

  mounted() {
    const lostItemsRef = collection(db, 'lostItems');
    onSnapshot(lostItemsRef, (snapshot) => {
      this.lostItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    });
  },

  methods: {
  async handleSendContact(item) {
    this.selectedItem = item;
    await sendNotification(item, this.selectedItem);
  },
}
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 120px; /* Same margin as sidebar */
}

.title {
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
}

.filter-section {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
}

.filter-section label {
  font-size: 1rem;
}

.filter-section select {
  padding: 5px;
  font-size: 1rem;
}

.items-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.item-bar {
  width: 100%;
  max-width: 500px;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #bddbf8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.keyword {
  background:#458dda;
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.9rem;
}

.location {
  margin-bottom: 4px;
}

.description {
  color: black;
}

button {
  cursor: pointer;
}

button:hover {
  background-color: #f07e13;
}
</style>
