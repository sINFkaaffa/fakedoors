<template>
  <div id="login">
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field s6">
            <input id="last_name" type="text" class="validate" v-model="loginName">
            <label for="last_name">Username</label>
          </div>
          <div class="input-field s6">
            <input id="password" type="password" class="validate" v-model="loginPw">
            <label for="password">Password</label>
          </div>
        </div>
      </form>
      <a class="btn waves-effect waves-light col s3 offset-s4" id="abort" type="submit" href="index.html">Abort</a>
      <button class="btn waves-effect waves-light col s3 offset-s4" type="submit" v-on:click="einlogen">Login</button>
    </div>
  </div>
</template>

<script>
import store from '../store/indexStore'

/*new Vue({
computed: {
  isAuthenticated: function () {
    return this.$store.getters.isAuthenticated()
  },
  data() {
    return {this.$data.userID}
  }
},
methods: {
  login() {
    this.$store.dispatch('login', this.$data.userID, requestOptions)
  }
}
  data(){
    userID: 0
  },

  data () {
    return {
      gelogt: false}
  },
})*/

export default {
  name: 'login',
  store: store,
  computed: {
    loginName: {
      get() {return store.state.loginName},
      set(value) {store.commit('loginName',value)}
    },
    loginPw: {
      get() {return store.state.loginPw},
      set(value) {store.commit('loginPw',value)}
    },
  },
  methods:{
    einlogen: function(){store.commit('einlogen')},
  },
}
</script>
