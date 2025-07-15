import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AudioPlayer from '../components/AudioPlayer.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/player',
    name: 'player',
    component: AudioPlayer,
    props: true
  },
  {
    path: '/book/:id',
    name: 'bookDetail',
    component: () => import('../views/BookDetail.vue')
  },
  {
    path: '/discover',
    name: 'discover',
    component: () => import('../views/Discover.vue')
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: () => import('../views/Catalog.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
