import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ReportLostItems from '@/views/ReportLostItems.vue'
import ReportItemForm from '@/views/ReportItemForm.vue'
import ListLostItems from '@/views/ListLostItems.vue'
import ListFoundItems from '@/views/ListFoundItems.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/report-lost-items', name: 'ReportLostItems', component: ReportLostItems },
  // For report form
  { path: '/report/:formType', name: 'ReportItemForm', component: ReportItemForm, props: true },
  { path: '/list-of-lost-items', name: 'ListLostItems', component: ListLostItems },
  { path: '/list-of-found-items', name: 'ListFoundItems', component: ListFoundItems },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
