<template>
  <div class="notification-container">
    <Sidebar />
    <div class="notification-content">
      <h1>Notifications</h1>
      <div v-if="notifications.length === 0" class="no-notifications">
        <p>No notifications yet.</p>
      </div>
      <div v-else>
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="notification"
          :class="{ seen: notification.seen }"
        >
          <div class="message">{{ notification.message }}</div>
          <div class="timestamp">{{ formatTimestamp(notification.timestamp) }}</div>
          <button @click="deleteNotification(notification.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import { db } from '@/firebase.js';

import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc, 
  arrayRemove
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'NotificationBox',
  components: { Sidebar },
  data() {
    return {
      notifications: [],
      currentUserId: null,
    };
  },
  methods: {
    formatTimestamp(timestamp) {
      if (!timestamp) return '';
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleString();
    },
    async fetchNotifications() {
      console.log('Fetching notifications for user:', this.currentUserId);
      if (!this.currentUserId) return;

      try {
        const notificationsRef = collection(db, 'notifications');
        const q = query(notificationsRef, where('posterUid', '==', this.currentUserId));
        const querySnapshot = await getDocs(q);

        let notifications = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        // Sort notifications by timestamp, descending
        notifications.sort((a, b) => {
          if (!a.timestamp || !b.timestamp) return 0;
          return b.timestamp.seconds - a.timestamp.seconds;
        });

        this.notifications = notifications;
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    },
    async deleteNotification(notificationId) {
      try {
        // Step 1: Delete the notification document
        await deleteDoc(doc(db, 'notifications', notificationId));
        console.log(`Notification ${notificationId} deleted from 'notifications' collection.`);

        // Step 2: Remove the ID from the user's notifications array
        const userRef = doc(db, 'User', this.currentUserId);
        await updateDoc(userRef, {
          notifications: arrayRemove(notificationId),
        });
        console.log(`Notification ${notificationId} removed from user's notifications array.`);

        // Step 3: Remove from local list
        this.notifications = this.notifications.filter((n) => n.id !== notificationId);
      } catch (error) {
        console.error('Error deleting notification:', error);
      }
    },
    listenForAuthState() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.currentUserId = user.uid;
          this.fetchNotifications();
        } else {
          console.log('No user is signed in');
        }
      });
    },
  },
  mounted() {
    this.listenForAuthState();
  },
};
</script>

<style scoped>
.notification-container {
  display: flex;
  padding: 20px;
  margin-left: 260px;
}

.notification-content {
  margin-left: 40px;
  padding: 20px;
  flex: 1;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

.no-notifications {
  text-align: center;
  font-style: italic;
}

.notification {
  background-color: #f1f1f1;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.notification .message {
  font-size: 1rem;
}

.notification .timestamp {
  font-size: 0.8rem;
  color: gray;
  margin-top: 5px;
}

button {
  background-color: #0058b0;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 5px;
}

button:hover {
  background-color: #f07e13;
}

.notification.seen {
  background-color: #d1ffd1;
}
</style>
<!-- //for one post, in 10 mins, the user can only click the send notification 3 times, after that, a prompt will show that "you have hit the notification limit, try 10mins later -->