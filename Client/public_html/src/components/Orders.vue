<template>
  <div id="bookinghistory" class="orderContainer">
    <div class="section hoverable z-depth-1 orderitem" v-for="(i,index) in orders" v-if="orders.length>0">
      <btnOrderDetail class="waves-effect waves-light btn orderitemDetailBtn"v-bind:orderId="i.orderId" v-on:orderDetail="orderDetail" v-if="!(i.orderId===reqOrderId)"></btnOrderDetail>
      <button class="waves-effect waves-light btn orderitemDetailBtn"v-if="(i.orderId===reqOrderId)" v-on:click="reqOrderIdBack"><i class="material-icons center">arrow_upward</i></button>
      <a class="waves-effect waves-light btn orderitemDetailBtn"><i class="material-icons center">print</i></a>
			<h5 class="orderitemText">Order of </h5>
			<h5 class="orderitemDate">{{i.date}}</h5>
			<h5 class="orderitemCounts">{{i.itemQuantity}} Doors</h5>
			<h5 class="orderitemTotalAll">Total: {{i.orderTotal}} SCM</h5>

      <div class="section z-depth-1 orderitemDetail" v-if="(i.orderId===reqOrderId)" v-for="j in orderDetails">
  			<img src="http://faykdoors.com/greenwooddoor.png" alt="no piture"/>
  	    <h5 class="orderitemDetailName">{{j.name}}</h5>
        <h5 class="orderitemDetailPrice">Quantity {{j.st}}x a {{j.price}} SCM</h5>
        <h5>Total: {{j.total}} SCM</h5>
  			<p>{{j.text}}</p>
  	  </div>
	  </div>

    <div class="cartNoItem" v-if="orders.length===0">
      <h5>There is no order history</h5>
    </div>

  </div>
</template>

<script>
import store from '../store/indexStore'
import btnOrderDetail from '../components/btnOrderDetail'


export default {
  name: 'orders',
  components: { btnOrderDetail },
  store: store,
  computed: {
    orders () {
	    return store.state.orders
    },
    reqOrderId(){
      return store.state.reqOrderId
    },
    orderDetails(){
      return store.state.orderDetails
    },
  },
  methods: {
    orderDetail: function(orderId){store.commit('orderDetail', orderId)},
    reqOrderIdBack: function(){store.commit('reqOrderIdBack')},
  },
  mounted: function(){
    axios.get("//localhost:3000/purchases", {
      headers: { 'x-access-key' : store.state.token }
    })
      .then( (data) => {
      store.state.orders = data.data.data;
      })
      .catch(function(err){
        console.log(err)
      })
  },

}
</script>
