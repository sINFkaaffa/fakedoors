import Vue from 'vue'
import Vuex from 'vuex'
import unorm from '../js/unorm'
import sjcl from '../js/sjcl'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    firstName: "Siegfried",
    lastName: "",
    userName: "",
    pw: "",
    dimension: "Dimension",
    planet: "Planet",
    pay: "",
    token:"",
    isAuthenticated: false,

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
    firstName: (state, name) => state.firstName = name,
    lastName: (state, name) => state.lastName = name,
    userName: (state, name) => state.userName = name,
    pw: (state, name) => state.pw = name,
    dim: (state, dim) => state.dimension = dim,
    planet: (state, planet) => state.planet = planet,
    pay: (state, name) => state.pay = name,

    logout: state => {
      state.isAuthenticated = false
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
      state.token=loginDB(state.loginName, state.pw); //Zuweisung wenn geht
      console.log(state.token);
      if(state.token){
        state.isAuthenticated=true
      }
    },
    registrieren: state => {
      state.pw = encrypt(state.pw, state.userName);
      state.token=registerDB(state.loginName, state.firstName, state.lastName, state.pw); //Zuweisung wenn geht
      console.log(state.token);
      if(state.token){
        state.isAuthenticated=true;
      }
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
      //Request orderDetails
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
  // PBKDF2 computation, result returned as hexadecimal encoding
  var key = sjcl.misc.pbkdf2(pw_plaintext, salt, rounds, 32 * 8, function(key) {
    var hasher = new sjcl.misc.hmac(key, sjcl.hash.sha256);
    this.encrypt = function () {
      return hasher.encrypt.apply(hasher, arguments);
    };
  });
  return sjcl.codec.hex.fromBits(key);
}

function loginDB(name, pw){
  var tok; // nicht nötig wenn request functionieren, dann ist direkte zuweisung möglich
  axios.post("//localhost:3000/login",{ username:name, pass:pw})
    .then( (data) => {
      console.log('login successfull')
      console.log(data)
      //state.firstName=data.firstName
      //state.token=data.x-access-key
    })
    .catch(function(err){
      console.log(err)
    });
  return tok=1; // nicht nötig wenn request functionieren, dann ist direkte zuweisung möglich
}

function registerDB(user, firstname, lastname, pw){
  var tok; // nicht nötig wenn request functionieren, dann ist direkte zuweisung möglich
  axios.post('//localhost:3000/register', {
    username: user,
 	  email: 'fakedoors@gmx.de',
 	  first_name: firstname,
 	  last_name: lastname,
 	  pass: pw,
 	  pass_repeat: pw
    })
    .then(function(response){
 	    console.log('register successfull')
      console.log(data)
      //state.firstName=data.firstName
      //state.token=data.x-access-key
    })
    .catch(function(err){
      console.log(err)
    });
  return tok=1; // nicht nötig wenn request functionieren, dann ist direkte zuweisung möglich
}
