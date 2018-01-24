axios.defaults.baseURL = '//localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
	products: function(callback) {
		axios.get('/products').then(function(response) {
			callback(response.data);
		})
	},

	login: function(username, email, password, callback) {
		axios.post('/login', {
			username: username,
			email: email,
			password: password
		}).then(function(response) {
			callback(response.data);
		})
	},

	register: function(username, email, password, passwordRepeat, firstName, lastName, callback) {
		axios.post('/register', {
			username: username,
			email: email,
			first_name: firstName,
			last_name: lastName,
			password: password,
			password_repeat: password
		}).then(function(response) {
			callback(response.data);
		});
	},

	account: function(token, callback) {
		axios.get('/account', {
			headers: { 'x-access-token': token }
		}).then(function(response) {
			callback(response.data);
		});
	},

	addresses: {
		all: function(token, callback) {
			axios.get('/addresses', {
				headers: { 'x-access-token': token }
			}).then(function(response) {
				// Call callback if provided
				if(typeof callback === 'function')
					callback(response.data);
			});
		},

		add: function(token, address, callback) {
			axios.post('/addresses/add', {
				first_name: address.firstName,
				last_name: address.lastName,
				street: address.street,
				street_nr: address.streetNr,
				city: address.city,
				zip: address.zip,
				planet: address.planet,
				dimension: address.dimension
			}, {
				headers: { 'x-access-token': token }
			}).then(function(response) {
				// Call callback if provided
				if(typeof callback === 'function')
					callback(response.data);
			});
		}
	},

	payMethods: {
		all: function(token, callback) {
			axios.get('/paymethods', {
				headers: { 'x-access-token': token }
			}).then(function(response) {
				// Call callback if provided
				if(typeof callback === 'function')
					callback(response.data);
			});
		},

		add: function(token, type, data, callback) {
			axios.post('/paymethods/add', {
				type: type,
				data: data
			}, {
				headers: { 'x-access-token': token }
			}).then(function(response) {
				// Call callback if provided
				if(typeof callback === 'function')
					callback(response.data);
			});
		}
	}
}
