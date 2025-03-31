import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './assets/style.css'; // Adjust path if needed
createApp(App).use(router).mount('#app')
