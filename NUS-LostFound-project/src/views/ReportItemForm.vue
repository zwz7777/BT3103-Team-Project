<template>
  <Sidebar />
  <div class="found-lost-form">

    <form @submit.prevent="handleSubmit" class="found-lost-form-container">
      <div class="first-line">
        <h2>{{ pageTitle }}</h2>
        <div class="form-switch-bar">
          <div class="form-toggle-wrapper">
            <button @click="switchFormType">
              {{ props.formType === 'lost' ? 'Report Found' : 'Report Lost' }}
            </button>
          </div>
        </div>
      </div>

      <!-- CATEGORY -->
      <SelectField label="Category">
        <select v-model="formData.category" required>
          <option disabled value="">Select a category</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </SelectField>

      <!-- COLOR -->
      <SelectField label="Color">
        <select v-model="formData.color" required>
          <option disabled value="">Select a color</option>
          <option v-for="colorOption in colors" :key="colorOption" :value="colorOption">
            {{ colorOption }}
          </option>
        </select>
      </SelectField>

      <!-- FACULTY -->
      <SelectField label="Faculty">
        <select v-model="formData.faculty" required>
          <option disabled value="">Select faculty</option>
          <option v-for="fac in faculties" :key="fac" :value="fac">
            {{ fac }}
          </option>
        </select>
      </SelectField>

      <!-- LOCATION -->
      <TypeField label="Location">
        <textarea v-model="formData.location" placeholder="Where you found/lost it (optional)" type="text" rows="3"
          required></textarea>
      </TypeField>

      <!-- DESCRIPTION -->
      <TypeField label="Description">
        <textarea v-model="formData.description" placeholder="More details (optional)" type="text" rows="3"
          required></textarea>
      </TypeField>

      <!-- URGENCY -->
      <TypeField label="Urgency">
        <div class="urgency-slider-wrapper">
          <input type="range" v-model="formData.urgency" min="1" max="10" step="1" class="urgency-slider" />
          <div class="urgency-scale-labels">
            <span v-for="n in 10" :key="n">{{ n }}</span>
          </div>
          <div class="urgency-scale-labels">
            <span>Least Urgent</span>
            <span> Most Urgent</span>
          </div>
        </div>
      </TypeField>

      <!-- UPLOAD IMAGE -->
      <TypeField label="Upload Images (optional)">
        <input type="file" multiple accept="image/jpeg,image/png,image/webp" @change="handleFileChange"
          ref="fileInput" />
        <div class="image-preview" v-if="selectedFiles.length">
          <div v-for="(file, index) in selectedFiles" :key="index" class="preview-item">
            <img :src="getPreviewUrl(file)" alt="Preview" />
          </div>
        </div>
        <div v-if="uploadProgress.length" class="progress-wrapper">
          <div v-for="(progress, index) in uploadProgress" :key="index" class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            <span>{{ progress }}%</span>
          </div>
        </div>
      </TypeField>

      <!-- SUBMIT -->
      <button type="submit" class="submit-button">
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { db, auth, storage } from '@/firebase'
import { collection, addDoc, serverTimestamp, doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref as storageRef, uploadBytes, getStorage, uploadBytesResumable } from 'firebase/storage'
import { onAuthStateChanged } from 'firebase/auth'
import SelectField from '@/components/SelectField.vue'
import TypeField from '@/components/TypeField.vue'
import Sidebar from '@/components/Sidebar.vue'

const props = defineProps({ formType: { type: String, default: 'lost' } })

const categories = ['Identity Document', 'Electronics', 'Clothing', 'Stationery', 'Others']
const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Others']
const faculties = ['SoC', 'CDE', 'FoS', 'FASS', 'Biz', 'Law', 'Utown', 'UCC', 'CLB']

const formData = ref({
  category: '',
  color: '',
  faculty: '',
  location: '',
  description: '',
  urgency: 5
})

const pageTitle = computed(() =>
  props.formType === 'lost' ? 'Found An Item' : 'Lost An Item'
)

const collectionName = computed(() =>
  props.formType === 'lost' ? 'lostItems' : 'foundItems'
)

const router = useRouter()

const switchFormType = () => {
  const target = props.formType === 'lost' ? '/report/found' : '/report/lost'
  router.push(target)
}

let user = ref(null)
onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser
})

// UPLOAD IMAGE
// Multiple file support
const selectedFiles = ref([])
const MAX_SIZE_MB = 4;

const supportedTypes = ['image/jpeg', 'image/png', 'image/webp']
const handleFileChange = (e) => {
  const files = Array.from(e.target.files)
  const validFiles = []
  const tooLarge = files.filter(file => file.size > MAX_SIZE_MB * 1024 * 1024);

  if (tooLarge.length > 0) {
    const names = tooLarge.map(f => f.name).join(', ');
    alert(`The following image(s) exceed 4MB:\n${names}\nPlease select smaller files.`);
    // remove oversized images
    selectedFiles.value = files.filter(file => file.size <= MAX_SIZE_MB * 1024 * 1024);
  } else {
    selectedFiles.value = files;
  }

  // check correct format
  files.forEach(file => {
    if (!supportedTypes.includes(file.type)) {
      alert(`${file.name} is not a supported format. Please upload JPG, PNG, or WEBP.`)
    } else {
      validFiles.push(file)
    }
  })

  selectedFiles.value = validFiles.slice(0, 3)
}

const getPreviewUrl = (file) => {
  return URL.createObjectURL(file)
}

// Upload multiple images: return an array of URLs
const uploadImages = async (files, postId) => {
  const urls = []
  uploadProgress.value = [] // reset progress

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const fileRef = storageRef(storage, `uploads/${postId}_${i}_${file.name}`)
    const uploadTask = uploadBytesResumable(fileRef, file)

    uploadProgress.value[i] = 0

    await new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          uploadProgress.value[i] = Math.round(progress)
        },
        (error) => reject(error),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref)
          urls.push(url)
          resolve()
        }
      )
    })
  }

  return urls
}

// upload process
const uploadProgress = ref([])

// add post ID to user's document
const updateUserPosts = async (uid, postId) => {
  try {
    const userRef = doc(db, 'User', uid)
    await updateDoc(userRef, {
      posts: arrayUnion(postId)
    })
  } catch (error) {
    console.error('Error updating user posts:', error)
  }
}

const handleSubmit = async () => {
  try {
    if (!user.value) {
      alert('Please log in to submit a post.')
      router.push('/')
      return
    }

    const postId = `item_${Date.now()}`
    let imageUrls = []

    if (selectedFiles.value.length) {
      imageUrls = await uploadImages(selectedFiles.value, postId)
    }


    const entry = {
      ...formData.value,
      userId: user.value.uid,
      timestamp: serverTimestamp(),
      imageUrls
    }

    const docRef = await addDoc(collection(db, collectionName.value), entry)

    // New: save post ID under the user's document
    await updateUserPosts(user.value.uid, docRef.id)

    formData.value = {
      category: '',
      color: '',
      faculty: '',
      location: '',
      description: '',
      urgency: 5
    }

    router.push(props.formType === 'lost' ? '/lostpage' : '/foundpage')
  } catch (error) {
    console.error('Error submitting form:', error)
    alert("Error in submitting entries")
  }
}
</script>

<style scoped>
.found-lost-form {
  padding-top: 0.3rem;
  width: 100%;
  margin-left: 260px;
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  width: 300px;
}

.found-lost-form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 650px;
  background-color: #fff;
  margin-left: 300px;
}

.first-line {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
}

.submit-button {
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: #0058b0;
  color: #fff;
  border: none;
  border-radius: 4px;
  align-self: center;
}

.form-toggle-wrapper button {
  padding: 0.3rem 0.7rem;
  color: #fff;
  background-color: #0058b0;
  border: 1px solid #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;
  align-self: baseline;
}

.form-toggle-wrapper button:hover {
  background-color: #f07e13;
  color: white;
}

.urgency-slider-wrapper {
  background: white
}

.urgency-label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-top: 0.25rem;
  color: #666;
}

.urgency-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 5px;
  background: #0058b0;
  outline: none;
  transition: background 0.3s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.urgency-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: white;
  border: 2px solid white;
  border-radius: 50%;
  transition: border 0.3s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.urgency-slider::-webkit-slider-thumb:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

.urgency-slider::-webkit-slider-thumb:active {
  box-shadow: 0 0 0 3px #0058b0;
}

.urgency-scale-labels {
  display: flex;
  justify-content: space-between;
  background: white;
  font-size: 0.875rem;
  margin-top: 4px;
  color: #666;
}

.urgency-current {
  margin-top: 4px;
  font-size: 0.85rem;
  color: #666;
}
</style>
