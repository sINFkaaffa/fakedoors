<template>
<button v-on:click="removeSt"><i class="small material-icons">arrow_drop_down</i></button>
</template>

<script>
export default {
  name: 'btnRemoveSt',
  props:['cartIndex'],
  methods:{
    removeSt: function(){
      this.$emit('removeSt',this.cartIndex)
    }
  }
}
</script>
