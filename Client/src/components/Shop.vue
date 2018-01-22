<template>
<div class="shopContainer">
  <div class="shopItem section hoverable z-depth-1" v-for="(i,index) in shop">
    <img src="i.ImagePath" alt="no picture" />
    <p class="shopItemName">{{i.fullName}}</p>
    <p class="shopItemPrice">{{i.price}} SCM</p>
    <!-- new template,btnAdd notice the index of the button,
      so the button can tell which door was selected and should push in the cart-->
    <btnAdd class="shopItemBtn waves-effect waves-light btn" v-bind:shopIndex="index" v-on:add="add"></btnAdd>
    <p class="shopItemDescrip">{{i.description}}</p>
  </div>
</div>
</template>

<script>
import store from '../store/indexStore'
import btnAdd from '../components/btnAdd'

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
    axios.get("//localhost:3000/products/1")
      .then((data) => {
        store.state.shop = data.data.data;
      })
      .catch(function(err) {
        console.log(err)
      })
  },
  methods: {
    add: function(shopIndex) {
      store.commit('add', shopIndex)
    }
  }
}
</script>
