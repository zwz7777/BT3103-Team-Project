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

      <!-- URGENCY -->
      <TypeField label="Urgency">
        <div class="urgency-slider-wrapper">
          <input
            type="range"
            v-model="formData.urgency"
            min="1"
            max="10"
            step="1"
            :style="sliderStyle"
            class="urgency-slider"
          />
          <div class="urgency-scale-labels">
            <span v-for="n in 10" :key="n">{{ n }}</span>
          </div>
          <div class="urgency-scale-labels">
            <span>Least Urgent</span>
            <span> Most Urgent</span>
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
  description: '',
  urgency: 5 // by default, medium urgency 
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
    // check whether the user is login
    if (!user.value) {
      alert('Please log in to submit a post.')
      router.push('/')
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
  padding-top: 0.3rem;
  width: 100%;
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
  background: #185be1;
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
  box-shadow: 0 0 0 3px #185be1;
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