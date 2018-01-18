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
      <router-link v-bind:to="'/'" id="loginBtn" class="waves-effect waves-light btn" >
        <p@click="einlogen">Login</p></router-link>
    </div
    <p>
      {{loginPw}}
    </p>
  </div>
</template>

<script>
import store from '../store/indexStore'

export default {
  name: 'login',
  store: store,
  computed: {
    loginName: {
      get() {return store.state.loginName},
      set(value) {store.commit('loginName',value)}
    },
    loginPw: {
      get() {return store.state.pw},
      set(value) {store.commit('pw',value)}
    },
  },
  methods:{
    einlogen: function(){store.commit('einlogen')},
  },
}
</script>
