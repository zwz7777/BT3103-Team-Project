import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import './assets/style.css';
createApp(App).use(router).use(VueChartkick).mount('#app')
