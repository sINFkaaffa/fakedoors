// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

new Vue({
  el: '#navbar',
  router,
  template: '<NavBar/>',
  components: { NavBar }
})

new Vue({
  el: '#footer',
  router,
  template: '<Footer/>',
  components: { Footer }
})
