<template>
  <div id="warenkorb">
	    <div class="cartContainer">
        <div class="section hoverable z-depth-1 cartitem" v-for="(i,index) in cart" v-if="cart.length>0">
          <btnAddSt class="waves-effect waves-light btn cartItemBtnAddSt"
            v-bind:cartIndex="index" v-on:addSt="addSt"></btnAddSt>
          <btnRemoveSt class="waves-effect waves-light btn cartItemBtnRemoveSt"
            v-bind:cartIndex="index" v-on:removeSt="removeSt"></btnRemoveSt>
          <btnRemove class="waves-effect waves-light btn cartItemBtnRemove"
            v-bind:cartIndex="index" v-on:remove="remove"></btnRemove>
        	<img src="i.image" alt="no piture"/>
        	<h5 class="cartitemName">{{i.name}}</h5>
        	<h5 class="cartitemTextCount">Quantity: {{i.st}}</h5>
        	<h6 class="cartitemPrice">a {{i.price}} SCM</h6>
        	<h5 class="cartitemTotal">Total: {{i.total}} SCM</h5>
        </div>
    </div>
    <div class="cartNoItem" v-if="cart.length===0">
      <h5>No Items were selected</h5>
    </div>

    <div class="cartFoot" v-if="cart.length>0">
      <h5 id="cartTotalAll">Total: {{all}} Schmeckels</h5>
      <div id="btn">
        <router-link v-bind:to="'/'" class="waves-effect waves-light btn"><i class="material-icons right">shopping_cart</i>More shopping</router-link>
      	<a class="waves-effect waves-light btn" id="cartBill"><i class="material-icons right">local_printshop</i>Bill</a>
      	<a class="waves-effect waves-light btn" href="error.html"><i class="material-icons right">credit_card</i>Pay</a>
      </div>
    </div>
	</div>
</template>

<script>
import store from '../store/indexStore'
import btnRemove from '../components/btnRemove'
import btnAddSt from '../components/btnAddSt'
import btnRemoveSt from '../components/btnRemoveSt'

export default {
  name: 'warenkorb',
  components: {btnRemove,btnAddSt, btnRemoveSt},
  store: store,
  computed: {
    shop(){
      return store.state.shop
    },
    cart(){
      return store.state.cart
    },
    all(){
      return store.state.all
    }
  },
  methods: {
    remove: function(cartIndex){store.commit('remove',cartIndex)},
    addSt: function(cartIndex){store.commit('addSt',cartIndex)},
    removeSt: function(cartIndex){store.commit('removeSt',cartIndex)},
  }
}
</script>
