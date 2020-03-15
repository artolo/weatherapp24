import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/weatherapp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/more/:place',
    name: 'More',
    component: () => import('../views/weathermore.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
