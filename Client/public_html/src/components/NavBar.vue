<template>
  <div id="navbar">
    <header>
      <div class="navbar-fixed">
        <nav>
          <div class="nav-wrapper cyan lighten-1">
            <router-link v-bind:to="'/'" class="brand-logo" id="logo">Fakedoors.com</router-link>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li>
                <router-link v-bind:to="'/login'" v-if="!gelogt">Login</router-link>
              </li>
              <li>
                <router-link v-bind:to="'/register'" v-if="!gelogt">Registration</router-link>
              </li>
              <li>
                <p id="benutzer" v-if="gelogt">Hello, {{customer[0].firstName}}</p>
              </li>
              <li>
                <router-link v-bind:to="'/orders'" v-if="gelogt">History</router-link>
              </li>
              <li>
                <router-link  v-bind:to="'/'" v-if="gelogt" >
                  <i class="middle material-icons" alt="Shopping Cart" @click="logout">exit_to_app</i>
                </router-link>
              </li>
              <li>
                <router-link v-bind:to="'/warenkorb'">
                  <i class="middle material-icons" alt="Shopping Cart">shopping_cart</i>
                  <p id="navCartCount" v-if="cartLength!=0">{{cartLength}}</p>
                </router-link>
              </li>

            </ul>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
import store from '../store/indexStore'

export default {
  name: 'navbar',
  store: store,
  computed: {
    cartLength () {
	    return store.state.cart.length
    },
    gelogt(){
      return store.state.isAuthenticated
    },
    customer(){
      return store.state.customer
    },
  },
  methods: {
    logout: function(){store.commit('logout')}
  },

}
</script>
