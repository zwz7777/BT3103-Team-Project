import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import LoginPage from '@/views/LoginPage.vue'
import ReportLost from '@/views/ReportLostItems.vue'
import ReportItemForm from '@/views/ReportItemForm.vue'
import Lost from '@/views/LostPage.vue'
import Found from '@/views/FoundPage.vue'
import Settings from '@/views/Settings.vue'
import Entrance from '@/views/Entrance.vue'

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/',
        name: 'Entrance',
        component: Entrance
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/report',
        name: 'Report Lost Items',
        component: ReportLost
    },
    { 
        path: '/report/:formType', 
        name: 'ReportItemForm', 
        component: ReportItemForm, 
        props: true 
    },
    {
        path: '/lostpage',
        name: 'Lost Item List',
        component: Lost
    },
    {
        path: '/foundpage',
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