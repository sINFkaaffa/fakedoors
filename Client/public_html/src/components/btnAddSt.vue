<template>
<button v-on:click="addSt"><i class="small material-icons">arrow_drop_up</i></button>
</template>

<script>
export default {
  name: 'btnAddSt',
  props:['cartIndex'],
  methods:{
    addSt: function(){
      this.$emit('addSt',this.cartIndex)
    }
  }
}
</script>
