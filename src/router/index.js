import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {usePlayMusicStore} from '@/stores/playMusic.js'
// let usePlayMusic = ''
// setTimeout(() => {
//   usePlayMusic = usePlayMusicStore()
// }, 1000)
 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/mine',
      name: 'mine',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      beforeEnter: (to, from, next) => {
        if (usePlayMusicStore().isLogin) {
          next()
        } else {
          next({name: 'login'})
        }
        // reject the navigation
        // return false
      },
    },
    {
      path: '/songlistdetail',
      name: 'songlistdetail',
      component: () => import('@/views/recommendSongListDetail.vue')
    },
    {
      path: '/paihangbangdetail',
      name: 'paihangbangdetail',
      component: () => import('@/views/paihangbangListDetail.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/search.vue'),
      
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue')
    }
  ]
})

export default router
