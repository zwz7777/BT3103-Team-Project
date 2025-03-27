import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import LoginPage from '@/views/LoginPage.vue'
import ReportLost from '@/views/ReportLost.vue'
import Lost from '@/views/LostPage.vue'
import Found from '@/views/FoundPage.vue'
import Settings from '@/views/Settings.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/ReportLost',
        name: 'Report Lost Items',
        component: ReportLost
    },
    {
        path: '/lostpage',
        name: 'Lost Item List',
        component: Lost
    },
    {
        path: '/FoundPage',
        name: 'Found Item List',
        component: Found
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;