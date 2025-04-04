<template>
  <div class="container">
    <!-- Filter Section -->
    <div class="filter-section">
      <label for="color-filter">Color: </label>
      <select v-model="selectedColor" id="color-filter">
        <option value="">All</option>
        <option v-for="color in uniqueColors" :key="color" :value="color">{{ color }}</option>
      </select>

      <label for="faculty-filter">Faculty: </label>
      <select v-model="selectedFaculty" id="faculty-filter">
        <option value="">All</option>
        <option v-for="faculty in uniqueFaculties" :key="faculty" :value="faculty">{{ faculty }}</option>
      </select>
    </div>

    <h1 class="title">Found Items</h1>
    <div class="items-wrapper">
      <div v-for="item in filteredItems" :key="item.id" class="item-bar">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FoundPage',
  data() {
    return {
      selectedColor: '',
      selectedFaculty: '',
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
  },
  computed: {
    // Get unique colors from the items
    uniqueColors() {
      const colors = new Set(this.lostItems.map(item => item.keywords.Color));
      return Array.from(colors);
    },
    // Get unique faculties from the items
    uniqueFaculties() {
      const faculties = new Set(this.lostItems.map(item => item.keywords.Faculty));
      return Array.from(faculties);
    },
    // Filtered items based on selected filters
    filteredItems() {
      return this.lostItems.filter(item => {
        const matchesColor = this.selectedColor ? item.keywords.Color === this.selectedColor : true;
        const matchesFaculty = this.selectedFaculty ? item.keywords.Faculty === this.selectedFaculty : true;
        return matchesColor && matchesFaculty;
      });
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 20px;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* align items to the left */
  box-sizing: border-box;
}

.title {
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
}

.filter-section {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
}

.filter-section label {
  font-size: 1rem;
}

.filter-section select {
  padding: 5px;
  font-size: 1rem;
}

.items-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.item-bar {
  width: 100%;
  max-width: 500px;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #DCE6FF;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.keywords {
  display: flex;
  flex-wrap: wrap;
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
