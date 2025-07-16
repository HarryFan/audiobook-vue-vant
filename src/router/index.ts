import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AudioPlayer from '../components/AudioPlayer.vue'
import { bookService } from '../services/bookService'

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
    // 透過函式提供必要 props，暫以第一本書為示範
    props: () => {
      const book = bookService.getAllBooks ? bookService.getAllBooks()[0] : bookService.getBookById('1')
      return {
        bookTitle: book?.title || '',
        authorName: book?.author || '',
        bookCover: book?.cover || book?.coverUrl || '',
        audioSrc: book?.audioUrl || ''
      }
    }
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
