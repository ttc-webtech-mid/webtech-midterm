import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../views/Home.vue'
import LeaderBoard from '../views/LeaderBoard.vue'
import Store from '../views/Store.vue'
import Profile from '../views/Profile.vue'
import About from '../views/About.vue'
import Class from '../views/Class.vue'
import Task from '../views/Task.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/leader_Board',
    name: 'LeaderBoard',
    component: LeaderBoard
  },
  {
    path: '/store',
    name: 'Store',
    component: Store
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/class',
    name: 'Class',
    component: Class
  },
  {
    path: '/class/task',
    name: 'task',
    component: Task
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
