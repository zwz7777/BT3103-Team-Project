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
        <!-- 2) Location -->
        <p class="location">Location: {{ item.location }}</p>

        <!-- 3) Description -->
        <p class="description">Description: {{ item.description }}</p>
        
        <div class="buttonWrapper">
          <!-- Check Details -->
          <CheckDetailsButton :itemType="'lost'" :itemId="item.id" />

          <!-- Button to trigger notification -->
          <button v-if="user && user.uid !== item.userId"
            @click="handleSendNotification(item)">
            Send Notification
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import CheckDetailsButton from '@/components/CheckDetails.vue';
import { sendNotification } from '@/services/notificationService';
import { collection, onSnapshot, getDocs, where, query } from 'firebase/firestore';
import { db } from '@/firebase.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'LostPage',

  components: {
    Sidebar,
    CheckDetailsButton
  },

  data() {
    return {
      user: null,
      contactInfoComplete: false,
      selectedColor: '',
      selectedFaculty: '',
      lostItems: [],
      failedUrls: []
    };
  },

  computed: {
    uniqueColors() {
      return [...new Set(this.lostItems.map(item => item.color).filter(Boolean))];
    },
    uniqueFaculties() {
      return [...new Set(this.lostItems.map(item => item.faculty).filter(Boolean))];
    },
    filteredItems() {
      return this.lostItems.filter(item => {
        const matchesColor = this.selectedColor ? item.color === this.selectedColor : true;
        const matchesFaculty = this.selectedFaculty ? item.faculty === this.selectedFaculty : true;
        return matchesColor && matchesFaculty;
      });
    }
  },

  mounted() {
    // 🔁 Real-time Firestore listener for lost items
    const lostItemsRef = collection(db, 'lostItems');
    onSnapshot(lostItemsRef, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort by urgency (high → low)
      this.lostItems = items.sort((a, b) => {
        const aUrgency = a.urgency ?? 0;
        const bUrgency = b.urgency ?? 0;
        return bUrgency - aUrgency;
      });
    });

    // 🔐 Check user and contact info
    const auth = getAuth();
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        this.user = currentUser;

        const userSnap = await getDocs(
          query(collection(db, 'User'), where('uid', '==', currentUser.uid))
        );

        if (!userSnap.empty) {
          const userData = userSnap.docs[0].data();
          this.contactInfoComplete = Boolean(userData.telegram || userData.phoneNumber);
        }
      }
    });

    // 🔁 Retry broken images when online
    window.addEventListener('online', this.retryFailedImages);
  },

  beforeUnmount() {
    window.removeEventListener('online', this.retryFailedImages);
  },

  methods: {
    async handleSendNotification(item) {
      try {
        if (!item) return;

        if (!this.contactInfoComplete) {
          alert('Please update your contact info before sending a notification.');
          this.$router.push('/settings');
          return;
        }

        await sendNotification(item);
        alert('Notification sent to the post owner!');
      } catch (error) {
        console.error('Failed to send notification - lost page:', error);
        alert('Failed to send notification. Please try again later.');
      }
    },

    handleImageError(url) {
      if (!this.failedUrls.includes(url)) {
        this.failedUrls.push(url);
      }
    },

    retryFailedImages() {
      this.failedUrls.forEach((url) => {
        const img = new Image();
        img.onload = () => {
          this.failedUrls = this.failedUrls.filter((u) => u !== url);
        };
        img.src = url;
      });
    }
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
  margin-left: 120px;
  /* Same margin as sidebar */
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
  background: #458dda;
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

.buttonWrapper {
  display: flex;
  justify-content: space-between;
}
button {
  cursor: pointer;
}

button:hover {
  background-color: #f07e13;
}
</style>
