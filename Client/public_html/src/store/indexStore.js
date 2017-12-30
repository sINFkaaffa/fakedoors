import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import { VueAuthenticate } from 'vue-authenticate'
import axios from 'axios'

Vue.use(Vuex)
//Vue.use(VueAxios, axios)

/*const vueAuth = new VueAuthenticate(Vue.prototype.$http, {
  baseUrl: 'http://localhost:8000'
})*/

export default new Vuex.Store({
  state: {
    isAuthenticated: false,

    shop:[
      {itemId:"1", name: "The red",price:100,st:0,total:0, image:"http://faykdoors.com/greenwooddoor.png", text:"Beschreibung 1"},
      {itemId:"2", name:"blue",price:200,st:0,total:0, image:"no", text:"Beschreibung 2"},
      {itemId:"3", name:"yellow",price:230,st:0,total:0, image:"no", text:"Beschreibung 3"},
      {itemId:"4", name:"green",price:260,st:0,total:0, image:"no", text:"Beschreibung 4"}
    ],
    cart: [],
    all: 0,
    cartLength: 0,

    orders: [
      {orderId:"1", date: "01.10.17", itemQuantity: 4, orderTotal: 400, customerId: "12" },
      {orderId:"2", date: "05.11.17", itemQuantity: 2, orderTotal: 200, customerId: "12" },
      {orderId:"3", date: "17.12.17", itemQuantity: 1, orderTotal: 100, customerId: "12" }
    ],
    orderDetails: [
      {itemId:"2", name:"blue",price:200,st:1,total:100, image:"no", text:"Beschreibung 2"},
      {itemId:"4", name:"green",price:260,st:2,total:200, image:"no", text:"Beschreibung 4"}
    ],
    reqOrderId: 0,
  },

  /*getters: {
    isAuthenticated() {
      return vueAuth.isAuthenticated()
    }
  },*/

  mutations: {
    logout: state => state.isAuthenticated=false,

    add: (state,shopIndex,id) =>{
      state.cart.push(state.shop[shopIndex])
      state.cartLength = state.cart.length
      var i = state.cart.length-1
      state.cart[i].st = 1
      state.cart[i].total = state.cart[i].price
      state.all += state.cart[i].total
    },
    remove: (state,cartIndex) =>{
      state.all -= state.cart[cartIndex].total
      state.cart.splice(cartIndex,1)
      state.cartLength = state.cart.length
    },
    addSt: (state,cartIndex) => {
      state.all += state.cart[cartIndex].price
      state.cart[cartIndex].st +=1
      state.cart[cartIndex].total = state.cart[cartIndex].st * state.cart[cartIndex].price
    },
    removeSt: (state,cartIndex) => {
      if(state.cart[cartIndex].st>0){
        state.cart[cartIndex].st -= 1
        state.all -= state.cart[cartIndex].price
      }
      state.cart[cartIndex].total = state.cart[cartIndex].st * state.cart[cartIndex].price
    },

    orderDetail: (state, orderId) =>{
      state.reqOrderId = orderId
    },
    reqOrderIdBack: (state) =>{
      state.reqOrderId = -1
    }

    /*isAuthenticated(state, payload) {
      sate.isAuthenticated = payload.isAuthenticated
    }*/
  },

  /*actions: {
    login(context, payload) {
      vueAuth.login(payload.user, payload.requestOptions).then((response) => {
        context.commit('isAuthenticated', {
          isAuthenticated: vueAuth.isAuthenticated()
        })
      })
    }
  }*/
})
