<template>
	<div id="user">

		<div class="section">
			<p>User Name: {{userName}}</p>
		</div>

		<div class="section">
			<p>First Name: {{firstName}}</p>
		</div>

		<div class="section">
			<p>Last Name: {{lastName}}</p>
		</div>

		<div class="divider"></div>

		<div class="section">
			<p>Dimension: {{dimension}}</p>
		</div>

		<div class="section">
			<p>Planet: {{planet}}</p>
		</div>

		<div class="divider"></div>

		<div class="section">
			<p>Paymethod: {{payMethod}}</p>
		</div>

		<img src="/src/assets/img/rick-and-morty-adult-swim.jpg" alt="Rick and Morty" class="userImg"/>

	</div>
</template>

<script>
	import store from '../store/indexStore'

	import accountHandler from '../handler/account'

	export default {
		name: 'User',
		store: store,

		data: function() {
			return {
				userName: '',
				email: '',
				firstName: '',
				lastName: '',
				planet: '',
				dimension: '',
				payMethod: ''
			};
		},

		mounted: function() {
			var self = this;
			var token = store.state.token;

			accountHandler.getInfo(token, (success, msg, info) => {
				// Successfully retrieved users account
				if(success) {
					// Save properties
					self.userName = info.username;
					self.email = info.email;
					self.firstName = info.firstName;
					self.lastName = info.lastName;

					// Get address
					accountHandler.getAddress(token, (success, msg, address) => {
						if(address) {
							self.planet = address.planet;
							self.dimension = address.dimension;
						}
					});

					// Get pay method
					accountHandler.getPayMethod(token, (success, msg, payMethod) => {
						if(payMethod)
							self.payMethod = payMethod.type;
					});
				}
				else { // Authentification failed
					alert("Login required");
					this.$router.push('/login');
				}
			})
		}
	}
</script>
<style>
	.section {
		padding-left: 150px;
	}
</style>
