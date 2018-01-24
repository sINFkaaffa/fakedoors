<template>
   <div class="shopContainer">
      <div class="shopItem section hoverable z-depth-1" v-for="(i,index) in shop">
         <img v-bind:src="i.imagePath" alt="no picture" />

         <p class="shopItemName">{{i.fullName}}</p>
         <p class="shopItemPrice">{{i.price}} SCM</p>

         <!-- new template,btnAdd notice the index of the button,
            so the button can tell which door was selected and should push in the cart-->

		 <btnAdd class="shopItemBtn waves-effect waves-light btn" v-bind:shopIndex="i.id" v-on:add="add"></btnAdd>
         <p class="shopItemDescrip">{{i.description}}</p>
      </div>
   </div>
</template>

<script>
	import store from '../store/indexStore'
	import btnAdd from '../components/btnAdd'

	import requestModel from '../models/request'

	export default {
		name: 'shop',

		components: {
			btnAdd
		},

		store: store,

		computed: {
			shop() {
				return store.state.shop
			}
		},

		mounted: function() {
			requestModel.products(response => {
				store.state.shop = response.data;
			});
		},

		methods: {
			add: function(productId) {
				store.commit('add', productId)
			}
		}
	}
</script>
