<template>
  <div id="login">
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field s6">
            <input id="last_name" type="text" class="validate" >
            <label for="last_name">Username</label>
          </div>
          <div class="input-field s6">
            <input id="password" type="password" class="validate">
            <label for="password">Password</label>
          </div>
        </div>
      </form>
      <button class="btn waves-effect waves-light col s3 offset-s4" id="abort" type="submit">Abort</button>
      <button class="btn waves-effect waves-light col s3 offset-s4" type="submit">Login</button>
    </div>
  </div>
</template>

<script>
import store from '../store/indexStore'

/*new Vue({

/*
store: store,

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
  name: 'login'
}
</script>
