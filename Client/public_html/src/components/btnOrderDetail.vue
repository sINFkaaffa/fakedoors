<template>
  <button v-on:click="orderDetail"><i class="material-icons center" >subdirectory_arrow_left</i></button>
</template>

<script>
export default {
  name: 'btnOrderDetail',
  props:['orderId'],
  methods:{
    orderDetail: function(){
      this.$emit('orderDetail', this.orderId)
    }
  }
}
</script>
