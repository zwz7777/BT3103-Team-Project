<template>
    <div class="notification-page">
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
          <button @click="markAsRead(notification.id)">Mark as read</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        notifications: [
          {
            id: "fakeNotification1",
            message: "User A has shared their contact information with you: 123-456-789",
            timestamp: new Date(),
            seen: false,
          },
          {
            id: "fakeNotification2",
            message: "User B has shared their contact information with you: userB@example.com",
            timestamp: new Date(),
            seen: false,
          },
        ],
      };
    },
    methods: {
      // Format timestamp as a readable date
      formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
      },
      // Mark notification as read
      markAsRead(notificationId) {
        const notification = this.notifications.find(
          (notification) => notification.id === notificationId
        );
        if (notification) {
          notification.seen = true;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .notification-page {
    padding: 20px;
    font-family: Arial, sans-serif;
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
    background-color: #0052cc;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    margin-top: 10px;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #0041a0;
  }
  
  .notification.seen {
    background-color: #d1ffd1;
  }
  </style>
  <!-- when click twoice mark as read, it will become unread again
   time should not be same as current time
   input: user A has shared their contact by click on the post "description"-->