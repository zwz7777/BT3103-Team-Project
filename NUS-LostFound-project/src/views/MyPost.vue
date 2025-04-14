<template>
  <Sidebar />
  <div class="My_post">
    <h2>My Posts</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="posts.length === 0">
      You haven't submitted any posts yet.
    </div>
    <div v-else>
      <div v-for="item in posts" :key="item.id" class="post-card">
        <!-- First Line: Category, Color, Faculty -->
        <div class="keywords">
          <span v-if="item.category" class="keyword"
            >Category: {{ item.category }}</span
          >
          <span v-if="item.color" class="keyword">Color: {{ item.color }}</span>
          <span v-if="item.faculty" class="keyword"
            >Faculty: {{ item.faculty }}</span
          >
        </div>

        <!-- Second Line: Location -->
        <p class="location">Location: {{ item.location }}</p>

        <!-- Third Line: Description -->
        <p class="description">Description: {{ item.description }}</p>

        <!-- Delete Button -->
        <button class="delete-button" @click="deletePost(item)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
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

export default {
  name: "MyPost",
  components: {
    Sidebar,
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
            }));
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        loading.value = false;
      }
    };

    const deletePost = async (item) => {
      try {
        // Delete from the correct collection
        const collectionName =
          item.type === "Found" ? "foundItems" : "lostItems";
        await deleteDoc(doc(db, collectionName, item.id));

        // Update the user's post list
        const userRef = doc(db, "User", userId.value);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        const updatedPosts = (userData.posts || []).filter(
          (postId) => postId !== item.id
        );
        await updateDoc(userRef, { posts: updatedPosts });

        // Remove from local list
        posts.value = posts.value.filter((post) => post.id !== item.id);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    };

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

.delete-button:hover {
  background-color: #c0392b;
}
</style>
