import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "@/views/Home.vue";
import LoginPage from "@/views/LoginPage.vue";
import ReportLost from "@/views/ReportLostItems.vue";
import ReportItemForm from "@/views/ReportItemForm.vue";
import Lost from "@/views/LostPage.vue";
import Found from "@/views/FoundPage.vue";
import Settings from "@/views/Settings.vue";
import Entrance from "@/views/Entrance.vue";
import NotificationBox from "@/views/NotificationBox.vue";
import MyPost from "@/views/MyPost.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    name: "Entrance",
    component: Entrance,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/report",
    name: "Report Lost Items",
    component: ReportLost,
    meta: { requiresAuth: true },
  },
  {
    path: "/report/:formType",
    name: "ReportItemForm",
    component: ReportItemForm,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/lostpage",
    name: "Lost Item List",
    component: Lost,
    meta: { requiresAuth: true },
  },
  {
    path: "/foundpage",
    name: "Found Item List",
    component: Found,
    meta: { requiresAuth: true },
  },
  {
    path: '/item/:type/:id',
    name: 'ItemPost',
    component: () => import('@/views/ItemPost.vue'),
    props: true
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: NotificationBox,
    meta: { requiresAuth: true },
  },
  {
    path: "/mypost",
    name: "My Posts",
    component: MyPost,
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: { requiresAuth: true },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

function waitForAuthReady() {
  return new Promise((resolve) => {
    const auth = getAuth();
    if (auth.currentUser) {
      resolve();
    } else {
      onAuthStateChanged(auth, () => {
        resolve();
      });
    }
  });
}

router.beforeEach(async (to, from) => {
  await waitForAuthReady();

  const isAuthenticated = getAuth().currentUser !== null;

  if (!isAuthenticated && to.meta.requiresAuth) {
    // redirect to Entrance page instead of Login
    return { name: "Entrance" };
  }
});

export default router;
