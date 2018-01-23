import Vue from 'vue';
import Vuex from 'vuex';
import unorm from '../js/unorm';
import sjcl from '../js/sjcl';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // noSendingRequestLogin true means, that no request would be access, because the backend can't answere
    noSendingRequestLogin: true,

    // Variables of register & login
    firstName: "",
    lastName: "",
    userName: "",
    pw: "",
    dimension: "Dimension",
    planet: "Planet",
    pay: "",
    isAuthenticated: false,
    token: "",

    // Variable of the first page
    shop: [],
    // Variables of shopping cart
    cart: [],
    shopIndexie: [],
    allTotal: 0,
    allDoors: 0,

    // TODO request in Orders.vue schreiben und hardcoded inhalt auskommentieren
    // request muss u.a. auch purchaseID
    // Variables of orders
    orders: [],
    // TODO request schreiben und hardcoded inhalt auskommentieren
    orderDetails: [],
    reqOrderId: 0,
  },

  mutations: {
    // Mutations of register & login
    // v-model-mutations
    firstName: (state, firstName) => state.firstName = firstName,
    lastName: (state, lastName) => state.lastName = lastName,
    userName: (state, userName) => state.userName = userName,
    pw: (state, pw) => state.pw = pw,
    dim: (state, dim) => state.dimension = dim,
    planet: (state, planet) => state.planet = planet,
    pay: (state, payment) => state.pay = payment,

    logout: state => {
      state.isAuthenticated = false;
      state.firstName = '';
      state.lastName = '';
      state.userName = '';
      state.pw = '';
      state.dimension = 'Dimension';
      state.planet = 'Planet';
      state.pay = '';
    },

    einlogen: state => {
      state.pw = encrypt(state.pw, state.userName);
      console.log(state.noSendingRequestLogin)
      if(state.noSendingRequestLogin){
        state.token=1;
      }
      else{
        state.token = loginDB(state.loginName, state.pw);
      }

      console.log(state.token);

      if (state.token) {
        state.isAuthenticated = true;
      }
    },

    registrieren: state => {
      state.pw = encrypt(state.pw, state.userName);
      if(state.noSendingRequestLogin){
        state.token=1;
      }
      else{
        registerDB(state.loginName, state.firstName, state.lastName, state.pw);
        state.token = loginDB(state.loginName, state.pw);
      }
      console.log(state.token);
      if (state.token) {
        state.isAuthenticated = true;
      }
      addAddress(state.planet, stat.dimension, state.token);
    },

    // mutation of the first page,
    /* The add-Button check, if the add-Btn of the selected door is in the shooping cart,
    because only new doors could be add in the shopping cart. So in the shopping cart are only different doors.*/
    add: (state, shopIndex) => {
      var x = true;
      if (state.shopIndexie.length > 0) {
        for (var j of state.shopIndexie) {
          if (j === shopIndex) {
            x = false;
          }
        }
      }

      if (x) {
        state.cart.push(state.shop[shopIndex]);
        var i = state.cart.length - 1;
        state.cart[i].st = 1;
        state.cart[i].total = state.cart[i].price;
        state.allTotal += state.cart[i].total;
        state.allDoors += 1;
        state.shopIndexie.push(shopIndex);
      }
    },

    // mutation of the shopping cart buttons
    // The remove-Btn remove the door complete
    remove: (state, cartIndex) => {
      state.allTotal -= state.cart[cartIndex].total;
      state.allDoors -= state.cart[cartIndex].st;
      state.cart.splice(cartIndex, 1);
      state.shopIndexie.splice(cartIndex, 1);
    },

    // IF you want more then one of a door, you can click on arrow-buttons and the will rise or remove the quantity of one door
    addSt: (state, cartIndex) => {
      state.allTotal += state.cart[cartIndex].price;
      state.allDoors += 1;
      state.cart[cartIndex].st += 1;
      state.cart[cartIndex].total = state.cart[cartIndex].st * state.cart[cartIndex].price;
    },

    removeSt: (state, cartIndex) => {
      if (state.cart[cartIndex].st > 0) {
        state.cart[cartIndex].st -= 1;
        state.allTotal -= state.cart[cartIndex].price;
        state.allDoors -= 1;
      }

      state.cart[cartIndex].total = state.cart[cartIndex].st * state.cart[cartIndex].price;
    },

// TODO hier orderDetails  Request
    // mutations of orders
    // mutations to ask for the details of an history order
    orderDetail: (state, orderId) => {
      state.reqOrderId = orderId;
      if(state.noSendingRequestLogin){
        state.orderDetails = [{
            itemId: "2",
            name: "blue",
            price: 200,
            st: 1,
            total: 100,
            image: "no",
            text: "Beschreibung 2"
          },
          {
            itemId: "4",
            name: "green",
            price: 260,
            st: 2,
            total: 200,
            image: "no",
            text: "Beschreibung 4"
          }
        ]
      }else{
        // TODO hier orderDetails  Request
      }

    },

    // mutation to close the order details
    reqOrderIdBack: (state) => {
      state.reqOrderId = -1;
    },

    // mutation for the pdf-print of the order
    print: (state) => {
      if(!noSendingRequestLogin){
        printDB(cart, allDoors, allTotal, token)
      }
    },
  },
});


// TODO Es wäre echt super/übersichtlicher, wenn wir diese Functionen in eine eigene Datei bekommen
// Functions for the mutations
var rounds = 1000;

function encrypt(pwPlainText, user) {
  pwPlainText = unorm.nfc(pwPlainText);
  user = unorm.nfc(user.trim()).toLowerCase();
  var salt = sjcl.codec.utf8String.toBits('fakedoors.com' + user); // Determenistic unique salt

  // PBKDF2 computation, result returned as hexadecimal encoding
  var key = sjcl.misc.pbkdf2(pwPlainText, salt, rounds, 32 * 8, function(key) {
    var hasher = new sjcl.misc.hmac(key, sjcl.hash.sha256);
    this.encrypt = function() {
      return hasher.encrypt.apply(hasher, arguments);
    };
  });

  return sjcl.codec.hex.fromBits(key);
}

function loginDB(name, pw) {
  var token;
  axios({
      url: '//localhost:3000/login',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        username: name,
        email: 'fakedoors@gmx.de',
        pass: pw,
      },
    })
    .then((data) => {
      console.log('login successfull');
      console.log(data);
      //token = data.token;
    })
    .catch(function(err) {
      console.log(err);
    });

  return token;
}

function registerDB(user, firstname, lastname, pw) {
  axios({
      url: '//localhost:3000/register',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        username: user,
        email: 'fakedoors@gmy.de',
        first_name: firstname,
        last_name: lastname,
        passw: pw,
        pass_repeat: pw,
      },
    }).then(function(response) {
      console.log('register successfull');
      console.log(data);

    })
    .catch(function(err) {
      console.log(err);
    });
}

function addAddress(planet, dim, token) {
  axios({
    url: '//localhost:3000/adresses/add',
    method: 'post',
    headers: {
      'x-access-token': token,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    planet: planet,
    dimension: dim,
  }).then(function(response) {
    console.log('register successfull');
  })
  .catch(function(err) {
    console.log(err)});
}

//TODO neue reqeust PDF drucken & vlt
function printDB(cart, allDoors, allTotal, token){
  // TODO
}
