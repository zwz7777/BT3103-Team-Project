<template>
    <div class="notification-container">
      <Sidebar />  <!-- Sidebar should appear here -->
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
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from '@/components/Sidebar.vue';
import { db } from '@/firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


export default {
  name: 'NotificationBox',

  components: {
    Sidebar,
  },

    data() {
      return {
        notifications: [],
        currentUserId: null,
      };
    },
    methods: {
      async fetchNotifications() {
        console.log('Fetching notifications for user:', this.currentUserId);
      if (!this.currentUserId) {
        console.log('User is not logged in.');
        return; // Return early if the user is not authenticated
      }

      try {
        const notificationsRef = collection(db, 'notifications');
        const q = query(notificationsRef, where('posterUid', '==', this.currentUserId));
        console.log('Querying notifications with posterUid:', this.currentUserId);

        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          console.log('No notifications found for this user.');
        } else {
          console.log(`Found ${querySnapshot.size} notifications.`);
        }

        const notifications = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched notifications:', notifications);

        this.notifications = notifications;
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    },

    // Initialize Firebase Auth state listener
    listenForAuthState() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          console.log('User signed in:', user.uid);
          this.currentUserId = user.uid; // Store the currentUserId
          this.fetchNotifications(); // Now fetch notifications
        } else {
          // No user is signed in
          console.log('No user is signed in');
        }
      });
    },
  },

  mounted() {
    console.log('Mounted NotificationBox component.');
    this.listenForAuthState(); // Listen for authentication state changes
  },
};
  </script>
  
  <style scoped>
  .notification-container {
  display: flex;
  padding: 20px;
  margin-left: 260px; /* Same margin as sidebar*/
  }

  .notification-content {
  margin-left: 40px;  /* Sidebar width */
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
  <!-- when click twoice mark as read, it will become unread again
   time should not be same as current time
   input: user A has shared their contact by click on the post "description"-->