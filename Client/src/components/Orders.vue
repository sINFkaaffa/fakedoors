<template>
<div id="bookinghistory" class="orderContainer">
  <div class="section hoverable z-depth-1 orderitem" v-for="(i,index) in orders" v-if="orders.length>0">
    <p class="orderitemText">Order of </p>
    <p class="orderitemDate">{{i.date}}</p>
    <p class="orderitemCounts">{{i.itemQuantity}} Doors</p>
    <p class="orderitemTotalAll">Total: {{i.orderTotal}} SCM</p>
    <btnOrderDetail class="waves-effect waves-light btn orderitemDetailBtn" v-bind:orderId="i.orderId" v-on:orderDetail="orderDetail" v-if="!(i.orderId===reqOrderId)"></btnOrderDetail>
    <button class="waves-effect waves-light btn orderitemDetailBtn" v-if="(i.orderId===reqOrderId)" v-on:click="reqOrderIdBack"><i class="material-icons center">arrow_upward</i></button>
    <a class="waves-effect waves-light btn orderitemDetailBtn" v-if="!noSendingRequestLogin">
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
    noSendingRequestLogin(){
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
    if(store.state.noSendingRequestLogin){
      store.state.orders =[{
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
      ]
    }else {
      axios.get("//localhost:3000/purchases", {
        headers: {
          'x-access-key': store.state.token
          }
        })
        .then((data) => {
        store.state.orders = data.data.data;
        })
        .catch(function(err) {
        console.log(err)
      })
    }
},

}
</script>
