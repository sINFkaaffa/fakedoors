import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		// Used for authentification
		token: null,

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
		token: (state, token) => state.token = token,

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
			// if(state.noSendingRequestLogin){
			//   state.orderDetails = [{
			//       itemId: "2",
			//       name: "blue",
			//       price: 200,
			//       st: 1,
			//       total: 100,
			//       image: "no",
			//       text: "Beschreibung 2"
			//     },
			//     {
			//       itemId: "4",
			//       name: "green",
			//       price: 260,
			//       st: 2,
			//       total: 200,
			//       image: "no",
			//       text: "Beschreibung 4"
			//     }
			//   ]
			// }else{
			//   // TODO hier orderDetails  Request
			// }

		},

		// mutation to close the order details
		reqOrderIdBack: (state) => {
			state.reqOrderId = -1;
		},
	},
});
