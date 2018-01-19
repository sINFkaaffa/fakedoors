<template>
  <div class="shopContainer">
	 <div class="shopitem section hoverable z-depth-1" v-for="(i,index) in shop" >
    <btnAdd class="waves-effect waves-light btn shopitemBtn" v-bind:shopIndex="index" v-on:add="add"></btnAdd>
		<img src="i.ImagePath" alt="no picture"/>
	  <h5 class="shopitemName">{{i.fullName}}</h5> <h5 class="shopitemPrice">{{i.price}} SCM</h5>
		<p>{{i.description}}</p>
	 </div>

	  <div class="shopitem section hoverable z-depth-1">
			<a class="waves-effect waves-light btn"><i class="material-icons right">shopping_cart</i>add</a>
			<img src="http://elevweb.skit.no/2005erol/fakedoors/images/doors/door6.png" alt="no piture"/>
			<h5 class="shopitemName">The white one</h5> <h5 class="shopitemPrice">100 Schmeckels</h5>
			<p>The white door has a small window and a steel left handle.</p>
	  </div>
  </div>
</template>

<script>
import store from '../store/indexStore'
import btnAdd from '../components/btnAdd'

export default {
  name: 'shop',
  components: {btnAdd},
  store: store,
  computed: {
    shop(){
      return store.state.shop
    }
  },
  mounted: function(){
    axios.get("//localhost:3000/products/1")
      .then( (data) => {
      store.state.shop = data.data.data;
      })
      .catch(function(err){
        console.log(err)
      })
  },
  methods: {
    add: function(shopIndex){store.commit('add',shopIndex)}
  }
}
</script>
