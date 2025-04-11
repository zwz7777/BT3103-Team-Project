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

import { collection, addDoc, doc, updateDoc, getDocs, query, where, arrayUnion } from 'firebase/firestore';
import { db } from '@/firebase.js';
import { onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


export default {
  name: 'LostPage',

  components: {
    Sidebar,
  },
  data() {
    return {
      selectedColor: '',
      selectedFaculty: '',
      lostItems: []
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
    this.selectedItem = item; // store item temporarily if needed
    await this.sendNotification();
  },
  async sendNotification() {
    try {
      // Step 1: Get the requester document (by matching uid field)
      const item = this.selectedItem; // from handleSendContact
      const posterUid = item.userId;
      const postDescription = item.description;
      const auth = getAuth();
      const requesterUid = auth.currentUser?.uid;
      //const requesterUid = this.$store.state.User.uid;
      const usersRef = collection(db, 'User');
      const q = query(usersRef, where('uid', '==', requesterUid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error('Requester not found');
        return;
      }

      const requesterDoc = querySnapshot.docs[0];
      const requesterData = requesterDoc.data();

      // Step 2: Construct message with requester's Telegram
      const message = `${requesterData.nickname || 'Someone'} is interested in your lost item: "${postDescription}".\nTelegram: ${requesterData.telegram || 'N/A'}`;

      // Step 3: Create notification document
      const notifRef = await addDoc(collection(db, 'notifications'), {
        posterUid,
        requesterUid,
        message,
      });

      // Step 4: Add notification ID to the poster's user document
      const posterQuery = query(usersRef, where('uid', '==', posterUid));
      const posterSnapshot = await getDocs(posterQuery);

      if (posterSnapshot.empty) {
        console.error('Poster not found');
        return;
      }

      const posterDocId = posterSnapshot.docs[0].id;
      const posterRef = doc(db, 'User', posterDocId);

      await updateDoc(posterRef, {
        notifications: arrayUnion(notifRef.id)
      });

      alert('Notification sent to the post owner!');
    } catch (error) {
      console.error('Error sending notification:', error.message, error.stack);
      alert('Failed to send notification.');
    }
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
