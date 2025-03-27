<template>
  <div class="form-group">
    <label class="field-label">{{ label }}</label>
    <div class="field-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.form-group {
  margin-bottom: 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
}

.field-label {
  font-weight: 600;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  width: 120px;
}

.field-content {
  display: flex;
  flex-direction: column;
  background-color: #E0E0E0; 
  appearance: none;
}

.field-content textarea {
  width: 100%; 
  margin-bottom: 0.25rem;
  height: 100px;
  resize: vertical;
  font-family: inherit;
  background-color: #E0E0E0;
}
</style>
