<template>
  <button v-on:click="orderDetail"><i class="material-icons center" >subdirectory_arrow_left</i>{{det}}</button>
</template>

<script>
export default {
  name: 'btnOrderDetail',
  props:['orderId'],
  data:{
    det: false
  },
  methods:{
    detl: function(){
      this.det=true
    },
    orderDetail: function(){
      this.$emit('orderDetail', this.orderId)
    }
  }
}
</script>
