<template>
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
        <!-- You wanted an extra piece of text, e.g. "Choose color" -->
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
        <textarea
          v-model="formData.location"
          placeholder="Where you found/lost it"
          type="text"
          rows="3"
          required
        ></textarea>
      </TypeField>

      <!-- DESCRIPTION -->
      <TypeField label="Description">
        <textarea
          v-model="formData.description"
          placeholder="More details (N/A if not applicable)"
          type="text"
          rows="3"
          required
        ></textarea>
      </TypeField>

      <!-- SUBMIT -->
      <button type="submit" class="submit-button">
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { db, auth } from '@/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import SelectField from '@/components/SelectField.vue'
import TypeField from '@/components/TypeField.vue'

// Receive "lost" or "found" from route param
const props = defineProps({ formType: { type: String, default: 'lost' } })

const categories = ['Identity Document', 'Electronics', 'Clothing', 'Stationery', 'Others']
const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Others']
const faculties = ['SoC', 'CDE', 'FoS', 'FASS', 'Biz', 'Law']

const formData = ref({
  category: '',
  color: '',
  faculty: '',
  location: '',
  description: ''
})

const pageTitle = computed(() =>
  props.formType === 'lost' ? 'Look for Lost Item' : 'Found Lost Item'
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

// Submits to Firestore
const handleSubmit = async () => {
  try {
    if (!user.value) {
      alert('Please log in to submit a post.')
      return
    }
    // add userId, timestamp
    const entry = {
      ...formData.value,
      userId: user.value.uid,
      timestamp: serverTimestamp()
    }

    await addDoc(collection(db, collectionName.value), entry)

    // Clear the form after submission
    formData.value = {
      category: '',
      color: '',
      faculty: '',
      location: '',
      description: ''
    }
    // Navigate to the item list page if submitted successfully
    router.push(props.formType === 'lost' ? '/lostpage' : '/foundpage')
  } catch (error) {
    console.error('Error submitting form:', error)
    alert("Error in submitting entries")
    formData.value = {
      category: '',
      color: '',
      faculty: '',
      location: '',
      description: ''
    }
    // test router
    router.push(props.formType === 'lost' ? '/lostpage' : '/foundpage')
  }
}
</script>

<style scoped>
.found-lost-form {
  padding-top: 2rem;
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.found-lost-form-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: #fff;
  padding: 1rem;
  max-width: 600px;
  margin: 0 auto;
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
  background-color: #185be1;
  color: #fff;
  border: none;
  border-radius: 4px;
  align-self: center;
}

.form-toggle-wrapper button {
  padding: 0.3rem 0.7rem;
  color: #185be1;
  background-color: #fff;
  border: 1px solid #185be1;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;
  align-self: baseline;
}

.form-toggle-wrapper button:hover {
  background-color: #185be1;
  color: white
}
</style>