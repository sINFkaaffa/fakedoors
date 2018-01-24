<template>
	<div>
		<div class="navbar-fixed">
			<nav>
				<div class="nav-wrapper cyan lighten-1">
					<router-link v-bind:to="'/'" id="logo">Fakedoors.com</router-link>

					<!--class="brand-logo"-->

					<ul id="nav-mobile" class="right navbarSmallMenu">
						<li>
							<router-link v-bind:to="'/login'" v-if="!loggedIn">Login</router-link>
						</li>

						<li>
							<router-link v-bind:to="'/register'" v-if="!loggedIn">Registration</router-link>
						</li>

						<li>
							<router-link v-bind:to="'/user'" v-if="loggedIn">Hello, {{username}}</router-link>
						</li>

						<li>
							<router-link v-bind:to="'/orders'" v-if="loggedIn">History</router-link>
						</li>

						<li>
							<router-link v-bind:to="'/'" v-if="loggedIn">
								<i class="middle material-icons" @click="logout">exit_to_app</i>
							</router-link>
						</li>

						<li>
							<router-link v-bind:to="'/warenkorb'">
								<i class="middle material-icons">shopping_cart</i>
								<p id="navCartCount" v-if="cartLength!=0">{{cartLength}}</p>
							</router-link>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	</div>
</template>

<script>
	import store from '../store/indexStore'

	import accountHandler from '../handler/account'

	export default {
		name: 'navbar',
		store: store,

		data: function() {
			return {
				username: ''
			}
		},

		computed: {
			cartLength() { return store.state.allDoors },
			loggedIn() { return store.state.token != null }
		},

		methods: {
			logout: function() {
				accountHandler.logout(store);
			}
		},

		updated: function() {
			var self = this;

			accountHandler.getInfo(store.state.token, (success, msg, info) => {
				if(success)
					self.username = info.username;
			})
		}
	}
</script>
