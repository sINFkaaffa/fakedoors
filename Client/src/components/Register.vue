

<template>
	<div id="register">
		<div class="row">
			<form class="col s12">
				<div class="row">
					<div class="input-field col s6">
						<input id="first_name" type="text" class="validate" v-model="firstName">
						<label for="first_name">First Name</label>
					</div>

					<div class="input-field col s6">
						<input id="last_name" type="text" class="validate" v-model="lastName">
						<label for="last_name">Last Name</label>
					</div>

					<div class="input-field col s6">
						<input id="user_name" type="text" class="validate" v-model="username">
						<label for="last_name">Username</label>
					</div>

					<div class="input-field col s6">
						<input id="password" type="password" class="validate" v-model="password">
						<label for="password">Password</label>
					</div>

					<div class="input-field col s6">
						<v-select :value.sync="selectDimension" :options="dimensions" v-model="dimension"></v-select>
					</div>

					<div class="input-field col s6">
						<v-select :value.sync="selectPlanet" :options="planets" v-model="planet"></v-select>
					</div>
				</div>
			</form>

			<h5 id="payText">Payment</h5>
			<div class="row payment">
				<form action="#">
					<p>
						<input class="with-gap" type="radio" name="group1" id="pay1" value="Bill" v-model="payMethod">
						<label for="pay1">Bill</label>
					</p>
					<p>
						<input class="with-gap" type="radio" name="group1" id="pay2" value="Spacecard" v-model="payMethod">
						<label for="pay2">Spacecard</label>
					</p>
					<p>
						<input class="with-gap" type="radio" name="group1" id="pay3" value="Bank" v-model="payMethod">
						<label for="pay3">Bank</label>
					</p>
					<p>
						<input class="with-gap" type="radio" name="group1" id="pay4" value="PayPal" v-model="payMethod">
						<label for="pay4">PayPal</label>
					</p>
					<p>
						<input class="with-gap" type="radio" name="group1" id="pay5" value="Bitcoin" v-model="payMethod">
						<label for="pay5">Bitcoin <small><strong>(DON'T YOU DARE!)</strong></small></label>
					</p>
				</form>
			</div>

			<a id="abort" href="/" class="btn waves-effect waves-light col s3 offset-s9" >Abort</a>
			<a@click="register" id="registBtn" class="waves-effect waves-light btn">Register</a>
		</div>
	</div>
</template>

<script>
	import vSelect from 'vue-select'
	import store from '../store/indexStore'

	import accountHandler from '../handler/account'

	// Setup input objects
	var register = {};
	var address = {};
	var payMethod = {};

	// Main
	export default {
		name: 'register',
		store: store,
		computed: {
			// Credentials
			firstName: {
				get() { return register.firstName },
				set(value) { register.firstName = value }
			},
			lastName: {
				get() { return register.lastName },
				set(value) { register.lastName = value }
			},
			username: {
				get() { return register.username },
				set(value) { register.username = value }
			},
			password: {
				get() { return register.password },
				set(value) { register.password = value }
			},

			// Address
			dimension: {
				get() { return address.dimension },
				set(value) { address.dimension = value }
			},
			planet: {
				get() { return address.planet },
				set(value) { address.planet = value }
			},

			// Pay method
			payMethod: {
				get() { return payMethod.type },
				set(value) { payMethod.type = value }
			}
		},
		components: {
			vSelect
		},
		data() {
			return {
				selectDimension: 'Dimension',
				selectPlanet: 'Planet',
				dimensions: [ 'C-137', 'C-132', 'J19ζ7', '35C', 'C-500A' ],
				planets: [ 'Earth', 'Planet of Dogs', 'Gazorpazorpian' ]
			}
		},
		methods: {
			register: function() {
				// Values
				var username = register.username;
				const email = "fakedoors@gmx.de"; // Not implemented in GUI
				var password = register.password;
				var firstName = register.firstName;
				var lastName = register.lastName;

				// Register user
				accountHandler.register(username, email, password, password, firstName, lastName, (success, message) => {
					if(!success) return alert(message);

					// Use username to login
					accountHandler.login(username, null, password, store, (success, message, data) => {
						if(!success) return;

						var token = data.token;

						// Add address
						const street = "Road to glory";
						const nr = "42";
						const city = "Germantown";
						const zip = "1337";
						var planet = address.planet;
						var dimension = address.dimension;
						accountHandler.addAddress(token, null, null, street, nr, city, zip, planet, dimension);

						// Add pay method
						var type = payMethod.type;
						const payData = "{}";
						accountHandler.addPayMethod(token, type, payData);

						// Redirect to account overview
						this.$router.push('/user');
					})
				});
			},
		}
	}
</script>
