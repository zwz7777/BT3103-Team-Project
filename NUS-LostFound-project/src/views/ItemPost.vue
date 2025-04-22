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
            <img v-if="!failedUrls.includes(url)" :src="url" alt="Preview" @error="handleImageError(url)" />
            <div v-else class="image-placeholder">
              <p>Preview unavailable.</p>
              <p> Auto-retrying...</p>
            </div>
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
import { ref, onMounted, onBeforeUnmount } from "vue";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import Sidebar from "@/components/Sidebar.vue";

const props = defineProps({
  type: String,
  id: String,
});

const item = ref(null);
const isModalOpen = ref(false);
const modalImage = ref("");
const failedUrls = ref([]);

function openModal(url) {
  modalImage.value = url;
  isModalOpen.value = true;
}

function closeModal() {
  modalImage.value = "";
  isModalOpen.value = false;
}

function formatDate(timestamp) {
  if (!timestamp) return "N/A";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleString();
}

function handleImageError(url) {
  if (!failedUrls.value.includes(url)) {
    failedUrls.value.push(url);
  }
}

function retryFailedImages() {
  failedUrls.value.forEach((url) => {
    const img = new Image();
    img.onload = () => {
      failedUrls.value = failedUrls.value.filter((u) => u !== url);
    };
    img.src = url;
  });
}

onMounted(async () => {
  const collectionName = props.type === "lost" ? "lostItems" : "foundItems";
  const docRef = doc(db, collectionName, props.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    item.value = docSnap.data();
  } else {
    console.error("Item not found in Firestore");
  }

  window.addEventListener("online", retryFailedImages);
});

onBeforeUnmount(() => {
  window.removeEventListener("online", retryFailedImages);
});
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
  width: 500px;
  height: auto;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.images-grid img:hover {
  transform: scale(1.05);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 260px;
  width: calc(100vw - 260px);
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  position: relative;
  max-width: 100%;
  max-height: 100%;
}

.modal-image {
  width: 100%;
  height: auto;
  max-height: 100vh;
  object-fit: contain;
  border-radius: 0 !important;
}

.modal-content img {
  border-radius: 0 !important;
}
</style>
