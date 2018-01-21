<template>
<div>
  <div class="divider"></div>
  <div class="section">
    <p>Username: {{userName}}</p>
  </div>
  <div class="section">
    <p>Firstname: {{firstName}}</p>
  </div>
  <div class="section">
    <p>Lastname: {{lastName}}</p>
  </div>
  <div class="section">
    <p>Dimension: {{dim}}</p>
  </div>
  <div class="section">
    <p>Planet: {{planet}}</p>
  </div>
  <div class="section">
    <p>Paymethod: {{pay}}</p>
  </div>
  <div class="divider"></div>
</div>
</template>

<script>
import store from '../store/indexStore'

export default {
  name: 'User',
  store: store,
  computed: {
    firstName: {
      get() {
        return store.state.firstName
      },
      set(value) {
        store.commit('firstName', value)
      }
    },
    lastName: {
      get() {
        return store.state.lastName
      },
      set(value) {
        store.commit('lastName', value)
      }
    },
    userName: {
      get() {
        return store.state.userName
      },
      set(value) {
        store.commit('userName', value)
      }
    },
    pw: {
      get() {
        return store.state.pw
      },
      set(value) {
        store.commit('pw', value)
      }
    },
    dim: {
      get() {
        return store.state.dimension
      },
      set(value) {
        store.commit('dim', value)
      }
    },
    planet: {
      get() {
        return store.state.planet
      },
      set(value) {
        store.commit('planet', value)
      }
    },
    pay: {
      get() {
        return store.state.pay
      },
      set(value) {
        store.commit('pay', value)
      }
    },
  },
}
</script>
<style>
.section {
  padding-left: 150px;
}
</style>
