import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import TicketsPage from '../pages/TicketsPage.vue'
import Dashboard from '../pages/Dashboard.vue'
import Login from '../pages/auth/Login.vue'
import Signup from '../pages/auth/Signup.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: TicketsPage
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/auth/signup',
    name: 'Signup',
    component: Signup
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
