import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactManager from "@/views/ContactManager"
import PageNotFound  from "@/views/PageNotFound"

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: "/contacts",
    component: HomeView
  },
  {
    path: '/contacts',
    name: 'ContactManager',
    component: ContactManager
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound
  },
]

const router = createRouter( {
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
