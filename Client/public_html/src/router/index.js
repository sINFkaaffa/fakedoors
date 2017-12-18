import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import About from '@/components/About'

import Warenkorb from '@/components/Warenkorb'
import Login from '@/components/Login'
import Register from '@/components/Register'
import BookingHistory from '@/components/BookingHistory'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/warenkorb',
      component: Warenkorb
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/bookinghistory',
      component: BookingHistory
    },
    {
      path: '/about',
      component: About
    }
  ]
})
