<template>
  <div class="shopContainer">
	      <div class="shopitem section hoverable z-depth-1">
					<a class="waves-effect waves-light btn"><i class="material-icons right">shopping_cart</i>add</a>
					<img src="http://faykdoors.com/greenwooddoor.png" alt="no piture"/>
	        <h5 class="shopitemName">The green one {{count}}</h5> <h5 class="shopitemPrice">100 Schmeckels</h5>
					<p>A green door with left handle and two oak deco windows.</p>
	      </div>
	      <div class="shopitem section hoverable z-depth-1">
					<a class="waves-effect waves-light btn"><i class="material-icons right">shopping_cart</i>add</a>
					<img src="https://www.real-fake-doors.com/uploads/9/5/8/1/95813832/screen-shot-2016-12-20-at-10-21-00-am.png" alt="no piture"/>
					<h5 class="shopitemName">The brown one</h5> <h5 class="shopitemPrice">100 Schmeckels</h5>
					<p>A brown door with left handle and two oak deco windows.</p>
	      </div>
	      <div class="shopitem section hoverable z-depth-1">
					<a class="waves-effect waves-light btn"><i class="material-icons right">shopping_cart</i>add</a>
					<img src="http://elevweb.skit.no/2005erol/fakedoors/images/doors/door2.png" alt="no piture"/>
					<h5 class="shopitemName">The bicolor one</h5> <h5 class="shopitemPrice">100 Schmeckels</h5>
					<p>A bicolor door has a peephole and left handle.</p>
	      </div>
	      <div class="shopitem section hoverable z-depth-1">
					<a class="waves-effect waves-light btn"><i class="material-icons right">shopping_cart</i>add</a>
					<img src="http://elevweb.skit.no/2005erol/fakedoors/images/doors/door6.png" alt="no piture"/>
					<h5 class="shopitemName">The white one</h5> <h5 class="shopitemPrice">100 Schmeckels</h5>
					<p>The white door has a small window and a steel left handle.</p>
	      </div>
	      <div class="shopitem section hoverable z-depth-1">
					<a class="waves-effect waves-light btn"><i class="material-icons right">shopping_cart</i>add</a>
					<img src="https://www.real-fake-doors.com/uploads/9/5/8/1/95813832/screen-shot-2016-12-20-at-10-20-22-am.png" alt="no piture"/>
					<h5 class="shopitemName">The purple one</h5> <h5 class="shopitemPrice">100 Schmeckels</h5>
					<p>The violet door has a small window, a left handle and is made of beech wood.</p>
	      </div>
	      <div class="shopitem section hoverable z-depth-1">
					<a class="waves-effect waves-light btn"><i class="material-icons right">shopping_cart</i>add</a>
					<img src="http://www.how-to-draw-funny-cartoons.com/image-files/cartoon-door-005.jpg" alt="no piture"/>
					<h5 class="shopitemName">The window door</h5> <h5 class="shopitemPrice">100 Schmeckels</h5>
					<p>A white door with a window with cross struts and a right oak handle.</p>
	      </div>
	      <div class="shopitem section hoverable z-depth-1">
					<a class=" waves-effect waves-light btn"><i class="material-icons right">shopping_cart</i>add</a>
					<img src="https://sites.google.com/site/wwwrealfakedoorscom/_/rsrc/1472691185287/home/realfake%208.jpg?height=200&width=149" alt="no piture"/>
 				 	<h5 class="shopitemName">The wood one</h5> <h5 class="shopitemPrice">100 Schmeckels</h5>
 				 	<p>The wooden door has a right, golden handle, golden hinges and two deco windows. </p>
	      </div>
</div>
</template>
<script>
import store from '../store/indexStore'

export default {
  name: 'shop',
  store: store,
  computed: {
    count () {
	    return store.state.count
    }
  }
}
</script>
