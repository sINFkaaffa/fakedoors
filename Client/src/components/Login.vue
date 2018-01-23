<template>
<div id="login">
  <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field s6">
          <input id="last_name" type="text" class="validate" v-model="userName">
          <label for="last_name">Username</label>
        </div>
        <div class="input-field s6">
          <input id="password" type="password" class="validate" v-model="loginPw">
          <label for="password">Password</label>
        </div>
      </div>
    </form>
    <a class="btn waves-effect waves-light col s3 offset-s4" id="abort" href="index.html">Abort</a>
    <router-link v-bind:to="'/user'" id="loginBtn" class="waves-effect waves-light btn">
      <p@click="einloggen">Login</p>
    </router-link>
  </div>
</div>
</template>

<script>
import store from '../store/indexStore'

export default {
  name: 'login',
  store: store,
  computed: {
    userName: {
      get() {
        return store.state.userName
      },
      set(value) {
        store.commit('userName', value)
      }
    },
    loginPw: {
      get() {
        return store.state.pw
      },
      set(value) {
        store.commit('pw', value)
      }
    },
  },
  methods: {
    einloggen: function() {
      store.commit('einloggen')
    },
  },
}
</script>
