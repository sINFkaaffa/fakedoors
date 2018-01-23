<template>
<div>


  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper cyan lighten-1">
        <router-link v-bind:to="'/'" id="logo">Fakedoors.com</router-link>
        <!--class="brand-logo"-->
        <ul id="nav-mobile" class="right navbarSmallMenu">
          <li>
            <router-link v-bind:to="'/login'" v-if="!geloggt">Login</router-link>
          </li>
          <li>
            <router-link v-bind:to="'/register'" v-if="!geloggt">Registration</router-link>
          </li>
          <li>
            <router-link v-bind:to="'/user'" v-if="geloggt">Hello, {{name}}</router-link>
          </li>
          <li>
            <router-link v-bind:to="'/orders'" v-if="geloggt">History</router-link>
          </li>
          <li>
            <router-link v-bind:to="'/'" v-if="geloggt">
              <i class="middle material-icons" @click="logout">exit_to_app</i>
            </router-link>
          </li>
          <li>
            <router-link v-bind:to="'/warenkorb'">
              <i class="middle material-icons">shopping_cart</i>
              <p id="navCartCount" v-if="cartLength!=0">{{cartLength}}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</div>
</template>

<script>
import store from '../store/indexStore'

export default {
  name: 'navbar',
  store: store,
  computed: {
    cartLength() {
      return store.state.allDoors
    },
    geloggt() {
      return store.state.token != ""
    },
    name() {
      return store.state.userName
    },
  },
  methods: {
    logout: function() {
      store.commit('logout')
    }
  },

}
</script>
