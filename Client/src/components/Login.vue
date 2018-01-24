<template>
	<div id="login">
		<div class="row">
			<form class="col s12">
				<div class="row">
					<div class="input-field s6">
						<input id="last_name" type="text" class="validate" v-model="username">
						<label for="last_name">Username</label>
					</div>

					<div class="input-field s6">
						<input id="password" type="password" class="validate" v-model="password">
						<label for="password">Password</label>
					</div>
				</div>
			</form>

			<a id="abort" href="/" class="btn waves-effect waves-light col s3 offset-s4">Abort</a>
			<p@click="login" id="loginBtn" class="waves-effect waves-light btn">Login</p>
		</div>
	</div>
</template>

<script>
	import store from '../store/indexStore'
	import router from '../router/index'

	import accountHandler from '../handler/account'

	// Setup input object
	var login = {};

	// Main
	export default {
		name: 'login',

		computed: {
			username: {
				get() { return login.username },
				set(value) { login.username = value }
			},
			password: {
				get() { return login.password },
				set(value) { login.password = value }
			}
		},

		methods: {
			login: function() {
				accountHandler.login(login.username,
					null, login.password, store, (
						success, message) => {
						alert(message);

						if (success) // Redirect to account overview
							this.$router.push('/user');
					});
			}
		}
	}
</script>
