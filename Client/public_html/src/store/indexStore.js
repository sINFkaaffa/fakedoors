import Vue from 'vue'
import Vuex from 'vuex'
import unorm from '../js/unorm'
import sjcl from '../js/sjcl'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginName: "",
    loginPw: "",
    firstName: "",
    lastName: "",
    userName: "",
    pw: "",
    dimension: "Dimension",
    planet: "Planet",
    pay: "",
    isAuthenticated: false,
    customerId: 0,
    customer:[
      {customerId: 12, pwHash: 48, userName: "Siggi", lastName: "Huber", firstName: "Siegfried", dimension:"C-132", planet: "Earth", pay:"last Name"}
    ],

    shop:[
      {itemId:"1", name: "The red",price:100,st:0,total:0, image:"http://faykdoors.com/greenwooddoor.png", text:"Beschreibung 1"},
      {itemId:"2", name:"blue",price:200,st:0,total:0, image:"no", text:"Beschreibung 2"},
      {itemId:"3", name:"yellow",price:230,st:0,total:0, image:"no", text:"Beschreibung 3"},
      {itemId:"4", name:"green",price:260,st:0,total:0, image:"no", text:"Beschreibung 4"}
    ],
    cart: [],
    shopIndexie: [],
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

  mutations: {
    loginName: (state, name) => state.loginName = name,
    loginPw: (state, pw) => state.loginPw = pw,
    firstName: (state, name) => state.firstName = name,
    lastName: (state, name) => state.lastName = name,
    userName: (state, name) => state.userName = name,
    pw: (state, name) => state.pw = name,
    dim: (state, dim) => state.dimension = dim,
    planet: (state, planet) => state.planet = planet,
    pay: (state, name) => state.pay = name,

    logout: state => {
      state.isAuthenticated=false
      state.loginName=""
      state.loginPw=""
      state.firstName= ""
      state.lastName= ""
      state.userName= ""
      state.pw= ""
      state.dimension= "Dimension"
      state.planet= "Planet"
      state.pay= ""
    },
    einlogen: state => {
      /* if(res.status === 200)
          state.customerId = res.body.customerId*/
      state.pw = encrypt(state.pw, state.userName);
      console.log(state.pw);
      state.isAuthenticated=true
    },
    registrieren: state => {
      /* if(res.status === 200)
          state.customerId = res.body.customerId*/
      state.pw = encrypt(state.ps, state.userName);
      console.log(state.pw);
      state.isAuthenticated=true
    },


    add: (state,shopIndex) => {
      var x = true

      if(state.shopIndexie.length>0){
        for(var j of state.shopIndexie){
          if(j === shopIndex){
            x = false
          }
        }
      }
      if(x){
        state.cart.push(state.shop[shopIndex])
        state.cartLength = state.cart.length
        var i = state.cart.length-1
        state.cart[i].st = 1
        state.cart[i].total = state.cart[i].price
        state.all += state.cart[i].total
        state.shopIndexie.push(shopIndex)
      }
    },
    remove: (state,cartIndex) =>{
      state.all -= state.cart[cartIndex].total
      state.cart.splice(cartIndex,1)
      state.cartLength = state.cart.length
      state.shopIndexie.splice(cartIndex,1)
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
  }
})


var rounds = 10;
function encrypt(pw_plaintext, user) {
  pw_plaintext = unorm.nfc(pw_plaintext)
  user = unorm.nfc(user.trim()).toLowerCase()

// Determenistic unique salt
  var salt = sjcl.codec.utf8String.toBits("fakedoors.com" + user);

// PBKDF2 computation, result returned as hexadecimal encoding
  var key = sjcl.misc.pbkdf2(pw_plaintext, salt, rounds, 32 * 8, function(key) {
        var hasher = new sjcl.misc.hmac(key, sjcl.hash.sha256);
        this.encrypt = function () {
            return hasher.encrypt.apply(hasher, arguments);
        };
    });

    return sjcl.codec.hex.fromBits(key);
}
