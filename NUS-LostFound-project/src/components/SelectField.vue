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
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.field-label {
  font-weight: 600;
  margin-right: 1rem;
  width: 120px;
}

.field-content {
  display: flex;
  flex-direction: column;
  width: 30%;
  background-color: #E0E0E0;
  appearance: none;
}

.field-content select {
  padding: 12px;
  appearance: none;
  width: 100%;
  font-size: 16px;
  font-family: inherit; 
  background-color: #f7f7f7;
  border: 1px solid #d1d1d1;
  border-radius: 8px;
}

</style>
