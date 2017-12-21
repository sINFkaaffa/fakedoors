<template>
  <div id="register">
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input id="first_name" type="text" class="validate">
            <label for="first_name">First Name</label>
          </div>
          <div class="input-field col s6">
            <input id="last_name" type="text" class="validate">
            <label for="last_name">Last Name</label>
          </div>
          <div class="input-field col s6">
            <input id="last_name" type="text" class="validate">
            <label for="last_name">Username</label>
          </div>
          <div class="input-field col s6">
            <input id="password" type="password" class="validate">
            <label for="password">Password</label>
          </div>
          <div class="input-field col s6">
            <select>
              <option value="" disabled selected>Choose your Dimension ID</option>
              <option value="1">C-137</option>
              <option value="2">C-132</option>
              <option value="3">J19ζ7</option>
              <option value="4">35C</option>
              <option value="5">C-500A</option>
            </select>
            <label>Dimension</label>
          </div>
          <div class="input-field col s6">
            <select>
              <option value="" disabled selected>Choose your Planet</option>
              <option value="1">Earth</option>
              <option value="2">Planet of Dogs</option>
              <option value="3">Gazorpazorpian</option>
            </select>
            <label>Planet</label>
          </div>
        </div>
      </form>
        <h5 id="payText">Zahlungsart</h5>
        <div class="row payment">
          <form action="#">
            <p>
              <input class="with-gap" type="radio" name="group1" id="test1">
              <label for="test1">Nachnahme</label>
            </p>
            <p>
              <input class="with-gap" type="radio" name="group1" id="test2">
              <label for="test2">Spacecard</label>
            </p>
          </form>
        </div>
          <button class="btn waves-effect waves-light col s3 offset-s9" id="abort" type="submit">Arbort</button>
          <button class="btn waves-effect waves-light col s3 offset-s9" id="registBtn" type="submit">Register</button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'register'
}

$(document).ready(function() {
$('select').material_select();
});

$('select').material_select('destroy');
</script>
