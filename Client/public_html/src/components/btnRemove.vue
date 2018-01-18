<template>
  <button v-on:click="removeIndex"><i class="material-icons right">remove_shopping_cart</i>remove</button>
</template>

<script>
export default {
  name: 'btnRemove',
  props:['cartIndex'],
  methods:{
    removeIndex: function(){
      this.$emit('remove',this.cartIndex)
    }
  }
}
</script>
