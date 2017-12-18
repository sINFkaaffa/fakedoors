<template>
  <div id="login">
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field s6">
            <input id="last_name" type="text" class="validate">
            <label for="last_name">Username</label>
          </div>
          <div class="input-field s6">
            <input id="password" type="password" class="validate">
            <label for="password">Password</label>
          </div>
        </div>
      </form>
      <button class="btn waves-effect waves-light col s3 offset-s4" type="submit">Login</button>
      <button class="btn waves-effect waves-light col s3 offset-s4" type="submit">Abort</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>
