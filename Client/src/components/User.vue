<template>
  <div>
    <div class="divider"></div>
    <div class="section">
      <p>Username:</p>
    </div>
    <div class="section">
      <p>Firstname:</p>
    </div>
    <div class="section">
      <p>Lastname:</p>
    </div>
    <div class="section">
      <p>Dimension:</p>
    </div>
    <div class="section">
      <p>Planet:</p>
    </div>
    <div class="section">
      <p>Paymethod:</p>
    </div>
    <div class="divider"></div>
  </div>
</template>

<script>
export default {
  name: 'User',
  store: store
}
</script>
<style>
.section {
  padding-left: 150px;
}
</style>
