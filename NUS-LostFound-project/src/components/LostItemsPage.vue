<template>
    <div class="container">
      <h1 class="title">Lost Items</h1>
      <div v-for="item in lostItems" :key="item.id" class="item-bar">
        <!-- First Line: Keywords -->
        <div class="keywords">
          <span v-for="(value, key) in item.keywords" :key="key" class="keyword">
            {{ key }}: {{ value }}
          </span>
        </div>
  
        <!-- Second Line: Location -->
        <p class="location">Location: {{ item.location }}</p>
  
        <!-- Third Line: Description -->
        <p class="description">Description: {{ item.description }}</p>

        <!-- Button to trigger notification -->
        <button @click="sendNotification(item)">Send Notification</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LostItemsPage',
    data() {
      return {
        lostItems: [
          {
            id: 1,
            keywords: {
              Category: 'student card',
              Color: 'white',
              Faculty: 'SOC'
            },
            location: 'Table at the Terrace, beside Smooy',
            description: 'Student card of Goh ..., last 4 digits of student card is 045X'
          },
          {
            id: 2,
            keywords: {
              Category: 'umbrella',
              Color: 'black',
              Faculty: 'Engineering'
            },
            location: 'Library entrance, next to the vending machines',
            description: 'Black umbrella with silver handle, brand XYZ'
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .item-bar {
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
    background-color: #DCE6FF;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .keywords {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
  }
  
  .keyword {
    background:#829CDDf0;
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
  </style>
  