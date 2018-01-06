import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import About from '@/components/About'
import Shop from '@/components/Shop'
import Warenkorb from '@/components/Warenkorb'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Orders from '@/components/Orders'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'shop',
      component: Shop
    },
    {
      path: '/warenkorb',
      name: 'warenkorb',
      component: Warenkorb
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders
    },
    {
      path: '/about',
      component: About
    }
  ]
})
