<template>
	<div id="warenkorb">
		<div class="cartContainer">
			<div class="section hoverable z-depth-1 cartitem" v-for="(i,index) in cart" v-if="cart.length>0">
				<img v-bind:src="i.imagePath" alt="no piture" />

				<p class="cartitemName">{{i.name}}</p>
				<p class="cartitemTextCount">Quantity: {{i.st}}</p>
				<p class="cartitemPrice">a {{i.price}} SCM</p>
				<p class="cartitemTotal">Total: {{i.total}} SCM</p>

				<!-- the three new templates, notice which button of which door was selected and add or remove the right door-->
				<btnAddSt class="waves-effect waves-light btn cartItemBtnAddSt" v-bind:cartIndex="index" v-on:addSt="addSt"></btnAddSt>
				<btnRemoveSt class="waves-effect waves-light btn cartItemBtnRemoveSt" v-bind:cartIndex="index" v-on:removeSt="removeSt"></btnRemoveSt>
				<btnRemove class="waves-effect waves-light btn cartItemBtnRemove" v-bind:cartIndex="index" v-on:remove="remove"></btnRemove>

				<div class="clear:both"></div>
			</div>
		</div>

		<div class="cartNoItem" v-if="!cart.length">
			<h5>No items selected yet</h5>
		</div>

		<div class="cartFoot" v-if="cart.length>0">
			<p id="cartTotalAll">Total: {{all}} Schmeckels</p>

			<div id="btn">
				<router-link v-bind:to="'/'" class="waves-effect waves-light btn shoppingBtn">
					<i class="material-icons right">shopping_cart</i>
					More shopping
				</router-link>

				<router-link v-bind:to="'/login'" v-if="!loggedIn" class="waves-effect waves-light btn payBtn">
					<i class="material-icons right">credit_card</i>
					Pay
				</router-link>

				<a class="waves-effect waves-light btn payBtn" v-if="loggedIn" href="error.html">
					<i class="material-icons right">credit_card</i>
					Pay
				</a>

				<a class="waves-effect waves-light btn" id="cartBill">
					<i class="material-icons right">local_printshop</i>
					Bill
				</a>
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

		components: {
			btnRemove,
			btnAddSt,
			btnRemoveSt
		},

		store: store,

		computed: {
			shop() { return store.state.shop },
			cart() { return store.state.cart },
			all() { return store.state.allTotal },
			loggedIn() { return store.state.token != null }
		},

		methods: {
			remove: function(cartIndex) {
				store.commit('remove', cartIndex)
			},

			addSt: function(cartIndex) {
				store.commit('addSt', cartIndex)
			},

			removeSt: function(cartIndex) {
				store.commit('removeSt', cartIndex)
			},

			print: function() {
				//store.commit('print')
			}
		}
	}
</script>
