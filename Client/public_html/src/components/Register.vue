<template>
  <div id="register">
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input id="first_name" type="text" class="validate" v-model="firstName">
            <label for="first_name">First Name</label>
          </div>
          <div class="input-field col s6">
            <input id="last_name" type="text" class="validate" v-model="lastName">
            <label for="last_name">Last Name</label>
          </div>
          <div class="input-field col s6">
            <input id="last_name" type="text" class="validate" v-model="userName">
            <label for="last_name">Username</label>
          </div>
          <div class="input-field col s6">
            <input id="password" type="password" class="validate" v-model="pw">
            <label for="password">Password</label>
          </div>
          <div class="input-field col s6">
            <v-select :value.sync="selectDimension" :options="dimension" v-model="dim" ></v-select>
            <!--<select>
              <option value="" disabled selected>Choose your Dimension ID</option>
              <option value="1">C-137</option>
              <option value="2">C-132</option>
              <option value="3">J19ζ7</option>
              <option value="4">35C</option>
              <option value="5">C-500A</option>
            </select>
            <label>Dimension</label>-->
          </div>
          <div class="input-field col s6">
            <v-select :value.sync="selectPlanet" :options="planets" v-model="planet"></v-select>
            <!--<select>
              <option value="" disabled selected>Choose your Planet</option>
              <option value="1">Earth</option>
              <option value="2">Planet of Dogs</option>
              <option value="3">Gazorpazorpian</option>
            </select>
            <label>Planet</label>-->
          </div>
        </div>
      </form>
        <h5 id="payText">Payment</h5>
        <div class="row payment">
          <form action="#">
            <p>
              <input class="with-gap" type="radio" name="group1" id="test1" value="Last Name" v-model="pay">
              <label for="test1">Last Name</label>
            </p>
            <p>
              <input class="with-gap" type="radio" name="group1" id="test2" value="Spacecard" v-model="pay">
              <label for="test2">Spacecard</label>
            </p>
          </form>
        </div>
          <a class="btn waves-effect waves-light col s3 offset-s9" id="abort" type="submit" href="index.html">Arbort</a>
          <button class="btn waves-effect waves-light col s3 offset-s9" id="registBtn" type="submit" v-on:click="registrieren">Register</button>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import store from '../store/indexStore'

export default {
  name: 'register',
  store: store,
  components: {vSelect},
  data() {
    return {
      selectDimension: 'Dimension',
      selectPlanet: 'Planet',
      dimension: ['C-137','C-132','J19ζ7','35C','C-500A'],
      planets: ['Earth','Planet of Dogs','Gazorpazorpian']
    }
  },
  computed: {
    firstName: {
      get() {return store.state.firstName},
      set(value) {store.commit('firstName',value)}
    },
    lastName: {
      get() {return store.state.lastName},
      set(value) {store.commit('lastName',value)}
    },
    userName: {
      get() {return store.state.userName},
      set(value) {store.commit('userName',value)}
    },
    pw: {
      get() {return store.state.pw},
      set(value) {store.commit('pw',value)}
    },
    dim: {
      get() {return store.state.dimension},
      set(value) {store.commit('dim',value)}
    },
    planet: {
      get() {return store.state.planet},
      set(value) {store.commit('planet',value)}
    },
    pay: {
      get() {return store.state.pay},
      set(value) {store.commit('pay',value)}
    },
  },
  methods:{
    registrieren: function(){store.commit('registrieren')},
  },
}

//$(document).ready(function() {
//$('select').material_select();
//});

//$('select').material_select('destroy');
</script>
