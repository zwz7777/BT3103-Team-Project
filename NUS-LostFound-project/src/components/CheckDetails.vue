<template>
    <button @click="goToItemDetails" class="check-details-btn">
      Check Details
    </button>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'

  // params for 
  const props = defineProps({
    itemType: { type: String, required: true },
    itemId: { type: String, required: true }
  })
  
  const router = useRouter()
  
  function goToItemDetails() {
    router.push({ name: 'ItemPost', params: { type: props.itemType, id: props.itemId }})
  }
  </script>
  
  <style scoped>
  .check-details-btn {
    background-color: #003bff;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  .check-details-btn:hover {
    background-color: #002bb4;
  }
  </style>
  