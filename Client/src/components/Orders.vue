<template>
<div id="bookinghistory" class="orderContainer">
  <div class="section hoverable z-depth-1 orderitem" v-for="(i,index) in orders" v-if="orders.length>0">
    <p class="orderitemText">Order of </p>
    <p class="orderitemDate">{{i.date}}</p>
    <p class="orderitemCounts">{{i.itemQuantity}} Doors</p>
    <p class="orderitemTotalAll">Total: {{i.orderTotal}} SCM</p>
    <btnOrderDetail class="waves-effect waves-light btn orderitemDetailBtn" v-bind:orderId="i.orderId" v-on:orderDetail="orderDetail" v-if="!(i.orderId===reqOrderId)"></btnOrderDetail>
    <button class="waves-effect waves-light btn orderitemDetailBtn" v-if="(i.orderId===reqOrderId)" v-on:click="reqOrderIdBack"><i class="material-icons center">arrow_upward</i></button>
    <a class="waves-effect waves-light btn orderitemDetailBtn">
      <i class="material-icons center" @click="print" >print</i></a>

    <div class="section z-depth-1 orderitemDetail" v-if="(i.orderId===reqOrderId)" v-for="j in orderDetails">
    	<img src="http://faykdoors.com/greenwooddoor.png" alt="no piture" />
	    <p class="orderitemDetailName">{{j.name}}</p>
      	<p class="orderitemDetailSt">Quantity {{j.st}}</p>
      	<p>x a {{j.price}} SCM</p>
      	<p class="orderitemDetailTotal">Total: {{j.total}} SCM</p>
      	<p class="orderitemDetailDescrib">{{j.text}}</p>
	</div>
  </div>

  <div class="cartNoItem" v-if="!orders.length">
    <h5>There is no order history</h5>
  </div>

</div>
</template>

<script>
	import store from '../store/indexStore'
	import btnOrderDetail from '../components/btnOrderDetail'

	export default {
		name: 'orders',

		components: {
			btnOrderDetail
		},

		store: store,

		computed: {
			orders() {
				return store.state.orders
			},
			reqOrderId() {
				return store.state.reqOrderId
			},
			orderDetails() {
				return store.state.orderDetails
			},
			noSendingRequestLogin() {
				return store.state.noSendingRequestLogin
			}
		},

		methods: {
			orderDetail: function(orderId) {
				store.commit('orderDetail', orderId)
			},
			reqOrderIdBack: function() {
				store.commit('reqOrderIdBack')
			},
			print: function() {
				store.commit('print')
			},
		},

		mounted: function() {
			axios.get("//localhost:3000/purchases", {
					headers: {
						'x-access-token': store.state.token
					}
				})
				.then(response => {
					store.state.orders = response.data.data;
				});
		}
	}
</script>
