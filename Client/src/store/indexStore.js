import Vue from 'vue';
import Vuex from 'vuex';
import unorm from '../js/unorm';
import sjcl from '../js/sjcl';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    noSendingRequestLogin: true,

    firstName: "",
    lastName: "",
    userName: "",
    pw: "",
    dimension: "Dimension",
    planet: "Planet",
    pay: "",
    token: "",
    isAuthenticated: false,

    shop: [],
    cart: [],
    shopIndexie: [],
    allTotal: 0,
    allDoors: 0,

// TODO request schreiben und hardcoded inhalt auskommentieren
// request muss u.a. auch purchaseID
    orders: [{
        orderId: "1",
        date: "01.10.17",
        itemQuantity: 4,
        orderTotal: 400,
        customerId: "12"
      },
      {
        orderId: "2",
        date: "05.11.17",
        itemQuantity: 2,
        orderTotal: 200,
        customerId: "12"
      },
      {
        orderId: "3",
        date: "17.12.17",
        itemQuantity: 1,
        orderTotal: 100,
        customerId: "12"
      }
    ],

    // TODO request schreiben und hardcoded inhalt auskommentieren
    orderDetails: [{
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
      registerDB(state.loginName, state.firstName, state.lastName, state.pw);
      state.token = loginDB(state.loginName, state.pw);
      console.log(state.token);
      if (state.token) {
        state.isAuthenticated = true;
      }
      addAddress(state.planet, stat.dimension, state.token);
    },

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
        state.all += state.cart[i].total;
        state.shopIndexie.push(shopIndex);
      }
    },

    remove: (state, cartIndex) => {
      state.all -= state.cart[cartIndex].total;
      state.cart.splice(cartIndex, 1);
      state.shopIndexie.splice(cartIndex, 1);
    },

    addSt: (state, cartIndex) => {
      state.all += state.cart[cartIndex].price;
      state.cart[cartIndex].st += 1;
      state.cart[cartIndex].total = state.cart[cartIndex].st * state.cart[cartIndex].price;
    },

    removeSt: (state, cartIndex) => {
      if (state.cart[cartIndex].st > 0) {
        state.cart[cartIndex].st -= 1;
        state.all -= state.cart[cartIndex].price;
      }

      state.cart[cartIndex].total = state.cart[cartIndex].st * state.cart[cartIndex].price;
    },

// TODO hier orderDetails  Request
    orderDetail: (state, orderId) => {
      state.reqOrderId = orderId;

      //Request orderDetails
    },

    reqOrderIdBack: (state) => {
      state.reqOrderId = -1;
    },

    print: (state) => {
      //printDB(cart[], allDoors, allTotal, token)
    },
  },
});

var rounds = 10;

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

/*
function loginDB(name, pw) {
  var tok; // nicht nötig wenn request functionieren, dann ist direkte zuweisung möglich
  axios.post('//localhost:3000/login', { username: name, pass: pw })
    .then((data) => {
      console.log('login successfull');
      console.log(data);

      //state.firstName=data.firstName
      //state.token=data.x-access-key
    })
    .catch(function (err) {
      console.log(err);
    });

  return tok = 1; // nicht nötig wenn request functionieren, dann ist direkte zuweisung möglich
}*/

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

      //state.firstName=data.firstName
      //state.token=data.x-access-key
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

/*
function registerDB(user, firstname, lastname, pw) {
  var tok; // nicht nötig wenn request functionieren, dann ist direkte zuweisung möglich
  axios.post('//localhost:3000/register', {
    username: user,
    email: 'fakedoors@gmx.de',
    first_name: firstname,
    last_name: lastname,
    pass: pw,
    pass_repeat: pw,
  })
    .then(function (response) {
      console.log('register successfull');
      console.log(data);

      //state.firstName=data.firstName
      //state.token=data.x-access-key
    })
    .catch(function (err) {
      console.log(err);
    });

  return tok = 1; // nicht nötig wenn request functionieren, dann ist direkte zuweisung möglich
}*/

//TODO neue reqeust PDF drucken & vlt
