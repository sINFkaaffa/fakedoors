<template>
  <div id="navbar">
    <header>
      <div class="navbar-fixed">
        <nav>
          <div class="nav-wrapper cyan lighten-1">
            <router-link v-bind:to="'/'" class="brand-logo">Fakedoors</router-link>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li>
                <router-link v-bind:to="'/login'">Login</router-link>
              </li>
              <li>
                <router-link v-bind:to="'/register'">Registration</router-link>
              </li>
              <li>
                <router-link v-bind:to="'/warenkorb'"> <i class="middle material-icons">shopping_cart</i></router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'navbar'
}
</script>
