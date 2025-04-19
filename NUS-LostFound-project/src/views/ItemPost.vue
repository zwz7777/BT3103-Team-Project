<template>
  <div class="item-post-page">
    <Sidebar />
    <h1>Item Details</h1>
    <div v-if="item">
      <p><strong>Category:</strong> {{ item.category }}</p>
      <p><strong>Color:</strong> {{ item.color }}</p>
      <p><strong>Faculty:</strong> {{ item.faculty }}</p>
      <p><strong>Location:</strong> {{ item.location }}</p>
      <p><strong>Description:</strong> {{ item.description }}</p>
      <p><strong>Urgency:</strong> {{ item.urgency }}</p>
      <p><strong>Time Reported:</strong> {{ formatDate(item.timestamp) }}</p>

      <!-- optional image -->
      <div class="images-section" v-if="item.imageUrls && item.imageUrls.length">
        <h3>Images:</h3>
        <div class="images-grid">
          <div v-for="(url, idx) in item.imageUrls" :key="idx" class="image-thumbnail" @click="openModal(url)">
            <img :src="url" alt="Preview" />
          </div>
        </div>
        <!-- Modal for larger image -->
        <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
          <div class="modal-content">
            <span class="close-btn" @click="closeModal">&times;</span>
            <img :src="modalImage" alt="Full Size" class="modal-image" />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading item details...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Sidebar from '@/components/Sidebar.vue'

// use params for router: { type: 'lost' | 'found', id: docId }
const props = defineProps({
  type: String,
  id: String
})

const item = ref(null)

const isModalOpen = ref(false)
const modalImage = ref('')

function openModal(url) {
  modalImage.value = url
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  modalImage.value = ''
}

onMounted(async () => {
  try {
    const collectionName = props.type === 'lost' ? 'lostItems' : 'foundItems'
    const docRef = doc(db, collectionName, props.id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      item.value = docSnap.data()
    } else {
      console.error('Item not found in Firestore')
    }
  } catch (error) {
    console.error('Error fetching item:', error)
  }
})

function formatDate(timestamp) {
  if (!timestamp) return 'N/A'
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleString()
}
</script>

<style scoped>
.item-post-page {
  max-width: 600px;
  margin: 1rem auto;
}

.images-section {
  margin-top: 1rem;
}

.images-grid {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.images-grid img {
  max-width: 150px;
  border-radius: 4px;
}
</style>