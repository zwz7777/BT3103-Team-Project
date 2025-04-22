<template>
  <Sidebar />
  <div class="My_post">
    <h2>My Posts</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="posts.length === 0">
      You haven't submitted any posts yet.
    </div>
    <div v-else>
      <!-- Lost Items Section -->
      <h3>My Lost Items:</h3>
      <div v-if="lostItems.length === 0">
        No lost items submitted.
      </div>
      <div v-for="item in lostItems" :key="item.id" class="post-card">
        <div class="keywords">
          <span v-if="item.category" class="keyword"
            >Category: {{ item.category }}</span
          >
          <span v-if="item.color" class="keyword">Color: {{ item.color }}</span>
          <span v-if="item.faculty" class="keyword"
            >Faculty: {{ item.faculty }}</span
          >
        </div>
        <p class="location">Location: {{ item.location }}</p>
        <p class="description">Description: {{ item.description }}</p>
        <div class="buttons">
          <button class="delete-button" @click="deletePost(item)">Delete</button>
          <CheckDetailsButton :itemType="item.type.toLowerCase()" :itemId="item.id" class="check-button"/>
        </div>
        
      </div>

      <!-- Found Items Section -->
      <h3>Items Found By Me:</h3>
      <div v-if="foundItems.length === 0">
        No found items submitted.
      </div>
      <div v-for="item in foundItems" :key="item.id" class="post-card">
        <div class="keywords">
          <span v-if="item.category" class="keyword"
            >Category: {{ item.category }}</span
          >
          <span v-if="item.color" class="keyword">Color: {{ item.color }}</span>
          <span v-if="item.faculty" class="keyword"
            >Faculty: {{ item.faculty }}</span
          >
        </div>
        <p class="location">Location: {{ item.location }}</p>
        <p class="description">Description: {{ item.description }}</p>
        <div class="buttons">
          <button class="delete-button" @click="deletePost(item)">Delete</button>
          <CheckDetailsButton :itemType="item.type.toLowerCase()" :itemId="item.id" class="check-button"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { auth, db } from "@/firebase";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Sidebar from "@/components/Sidebar.vue";
import CheckDetailsButton from '@/components/CheckDetails.vue';

export default {
  name: "MyPost",
  components: {
    Sidebar,
    CheckDetailsButton
  },
  setup() {
    const posts = ref([]);
    const loading = ref(true);
    const userId = ref(null);

    const fetchUserPosts = async (uid) => {
      try {
        const userRef = doc(db, "User", uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const postIds = userSnap.data().posts || [];

          const foundSnap = await getDocs(collection(db, "foundItems"));
          const lostSnap = await getDocs(collection(db, "lostItems"));

          const allPosts = [...foundSnap.docs, ...lostSnap.docs];
          posts.value = allPosts
            .filter((doc) => postIds.includes(doc.id))
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
              type: foundSnap.docs.some((d) => d.id === doc.id)
                ? "Found"
                : "Lost",
            }))
            .sort((a, b) => (b.timestamp?.toMillis?.() || 0) - (a.timestamp?.toMillis?.() || 0));
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        loading.value = false;
      }
    };

    const deletePost = async (item) => {
      const confirmed = window.confirm("Are you sure you want to delete this post?");
      if (!confirmed) return;

      try {
        const collectionName =
          item.type === "Found" ? "foundItems" : "lostItems";
        await deleteDoc(doc(db, collectionName, item.id));

        const userRef = doc(db, "User", userId.value);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        const updatedPosts = (userData.posts || []).filter(
          (postId) => postId !== item.id
        );
        await updateDoc(userRef, { posts: updatedPosts });

        posts.value = posts.value.filter((post) => post.id !== item.id);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    };

    const lostItems = computed(() =>
      posts.value.filter((item) => item.type === "Lost")
    );
    const foundItems = computed(() =>
      posts.value.filter((item) => item.type === "Found")
    );

    onMounted(() => {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          userId.value = currentUser.uid;
          fetchUserPosts(currentUser.uid);
        } else {
          loading.value = false;
        }
      });
    });

    return {
      posts,
      loading,
      deletePost,
      lostItems,
      foundItems,
    };
  },
};
</script>

<style scoped>
.My_post {
  margin-left: 260px;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.post-card {
  background-color: #bddbf8;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-weight: bold;
  margin-bottom: 8px;
}

.keyword {
  background-color: #458dda;
  color: white;
  font-weight: normal;
  font-size: 1rem;
  padding: 4px 10px;
  border-radius: 6px;
}

.location,
.description {
  margin: 4px 0;
}

.delete-button {
  margin-top: 10px;
  background-color: #0058b0;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.check-button {
  margin-top: 10px;
  background-color: #0058b0;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c0392b;
}

.check-button:hover {
  background-color: #f07e13;
}

.buttons {
  display: flex;
  justify-content: space-between;
  width: 12rem;
  height: 3rem;
}
</style>
