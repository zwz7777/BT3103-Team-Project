<template>
  <Sidebar />
    <div class="report-lost-items-page">
      <h2>Report Items</h2>
      <div class="choose-btns">
        <!-- Button for Found Lost Items -->
        <button @click="goFound">Found lost items</button>
  
        <!-- Button for Look for Lost Items -->
        <button @click="goLost">Look for lost items</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from '@/components/Sidebar.vue'
import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const goFound = () => {
    router.push('/report/found')
  }
  
  const goLost = () => {
    router.push('/report/lost')
  }
  </script>
  
  <style scoped>
  .report-lost-items-page {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    /* margin-left: 300px; */
  }
  
  .choose-btns {
    display: flex;
    gap: 1rem;
  }
  
  .choose-btns button {
    background-color: #fff;
    border: 2px solid #0335B4;
    color: black;
    padding: 1.75rem 3.25rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: 6px;
    transition: background-color 0.3s;

  }
  
  .choose-btns button:hover {
    background-color: #0335B4;
    color: #fff;
  }
  </style>
  