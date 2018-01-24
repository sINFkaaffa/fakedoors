<template>
<button v-on:click="addIndex"><i class="material-icons right">shopping_cart</i>add</button>
</template>

<script>
export default {
  name: 'btnAdd',
  props: ['shopIndex'],
  methods: {
    addIndex: function() {
      this.$emit('add', this.shopIndex)
    }
  }
}
</script>
