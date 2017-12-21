<template>
  <div id="warenkorb">
	    <div class="cartContainer">
        <div class="section hoverable z-depth-1 cartitem">
        					<a class="waves-effect waves-light btn"><i class="small material-icons right">remove_shopping_cart</i>remove</a>
        					<img src="http://faykdoors.com/greenwooddoor.png" alt="no piture"/>
        	        <h5 class="cartitemName">The green one</h5>
        					<h5 class="cartitemTextCount">Quantity: </h5>
        					<input id="cartitemCount" type="number" min="1"/>
        					<h5 class="cartitemPrice">a 100 Sc</h5>
        					<h5 class="cartitemTotal">Total:  100 Sc</h5>
        	      </div>
        	      <div class="section hoverable z-depth-1 cartitem">
        					<a class="waves-effect waves-light btn"><i class="small material-icons right">remove_shopping_cart</i>remove</a>
        					<img src=https://www.real-fake-doors.com/uploads/9/5/8/1/95813832/screen-shot-2016-12-20-at-10-21-00-am.png alt="no piture"/>
        	        <h5 class="cartitemName">The brown one</h5>
        					<h5 class="cartitemTextCount">Quantity: </h5>
        					<input id="cartitemCount" type="number" min="1" />
        					<h5 class="cartitemPrice">a 100 Sc</h5>
        					<h5 class="cartitemTotal">Total:  500 Sc</h5>
        	      </div>
        	      <div class="section hoverable z-depth-1 cartitem">
        					<a class="waves-effect waves-light btn"><i class="small material-icons right">remove_shopping_cart</i>remove</a>
        					<img src="https://www.real-fake-doors.com/uploads/9/5/8/1/95813832/screen-shot-2016-12-20-at-10-20-22-am.png" alt="no piture"/>
        	        <h5 class="cartitemName">The purple one</h5>
        					<h5 class="cartitemTextCount">Quantity: </h5>
        					<input id="cartitemCount" type="number" min="1" />
        					<h5 class="cartitemPrice">a 10 Sc</h5>
        					<h5 class="cartitemTotal">Total:  10 Sc</h5>
        	      </div>
        	    </div>
        			<div class="cartFoot">
        				<h5 id="cartTotalAll">Total: 700 Schmeckels</h5>
        				<div id="btn">
        					<a class="waves-effect waves-light btn"><i class="material-icons right">shopping_cart</i>More shopping</a>
        					<a class="waves-effect waves-light btn" id="cartBill"><i class="material-icons right">local_printshop</i>Bill</a>
        					<a class="waves-effect waves-light btn"><i class="material-icons right">credit_card</i>Pay</a>
        				</div>
        </div>
		</div>
</template>

<script>
export default {
  name: 'warenkorb'
}
</script>
