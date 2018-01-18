import Vue from 'vue'
import Vuex from 'vuex'
import unorm from '../js/unorm'
import sjcl from '../js/sjcl'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginName: "",
    firstName: "",
    lastName: "",
    userName: "",
    pw: "",
    dimension: "Dimension",
    planet: "Planet",
    pay: "",
    token:"",
    isAuthenticated: false,
    customerId: 0,
    customer:[
      {customerId: 12, pwHash: 48, userName: "Siggi", lastName: "Huber", firstName: "Siegfried", dimension:"C-132", planet: "Earth", pay:"last Name"}
    ],

//{itemId:"1", name: "The red",price:100,st:0,total:0, image:"http://faykdoors.com/greenwooddoor.png", text:"Beschreibung 1"}
    shop:[],
    cart: [],
    shopIndexie: [],
    all: 0,

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
      state.firstName= ""
      state.lastName= ""
      state.userName= ""
      state.pw= ""
      state.dimension= "Dimension"
      state.planet= "Planet"
      state.pay= ""
    },
    einlogen: state => {
      state.pw = encrypt(state.pw, state.userName);
      console.log(state.pw);
      state.isAuthenticated=loginDB(state.loginName, state.pw);
    },
    registrieren: state => {
      state.pw = encrypt(state.pw, state.userName);
      console.log(state.pw);
      state.isAuthenticated=registerDB(state.loginName, state.firstName, state.lastName, state.pw);
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
        var i = state.cart.length-1
        state.cart[i].St = 1
        state.cart[i].Total = state.cart[i].Price
        state.all += state.cart[i].Total
        state.shopIndexie.push(shopIndex)
      }
    },
    remove: (state,cartIndex) =>{
      state.all -= state.cart[cartIndex].Total
      state.cart.splice(cartIndex,1)
      state.shopIndexie.splice(cartIndex,1)
    },
    addSt: (state,cartIndex) => {
      state.all += state.cart[cartIndex].Price
      state.cart[cartIndex].St +=1
      state.cart[cartIndex].Total = state.cart[cartIndex].St * state.cart[cartIndex].Price
    },
    removeSt: (state,cartIndex) => {
      if(state.cart[cartIndex].St>0){
        state.cart[cartIndex].St -= 1
        state.all -= state.cart[cartIndex].Price
      }
      state.cart[cartIndex].Total = state.cart[cartIndex].St * state.cart[cartIndex].Price
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
  var salt = sjcl.codec.utf8String.toBits("fakedoors.com" + user);  // Determenistic unique salt
  var key = sjcl.misc.pbkdf2(pw_plaintext, salt, rounds, 32 * 8, function(key) { // PBKDF2 computation, result returned as hexadecimal encoding
        var hasher = new sjcl.misc.hmac(key, sjcl.hash.sha256);
        this.encrypt = function () {
            return hasher.encrypt.apply(hasher, arguments);
        };
    });
    return sjcl.codec.hex.fromBits(key);
}

function loginDB(name, pw){
    axios.post("//localhost:3000/login",{ username:name, pass:pw})
    .then( (data) => {
      console.log(data)
      console.log('login successfull')
    })
    .catch(function(err){
      console.log(err)
    });
  return true;
}

function registerDB(user, firstname, lastname, pw){
  axios.post('//localhost:3000/register', {
    username: user,
 	  email: '',
 	  firstName: firstname,
 	  lastName: lastname,
 	  pass: pw,
 	  pass_repeat: pw
    })
    .then(function(response){
 	    console.log('register successfull')
    })
    .catch(function(err){
      console.log(err)
    });
  return true;
}
