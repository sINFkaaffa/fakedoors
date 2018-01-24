import encryption from '../lib/encryption'
import requestModel from '../models/request'

export default {
	login: function(username, email, password, store, callback) {
		if(username && password)
			password = encryption.pbkpdf2(password, username);

		requestModel.login(username, email, password, result => {
			var success = result.success;
			var data = result.data;

			if(success)
				store.commit('token', data.token);

			callback(success, result.message, data);
		});
	},

	logout: function(store) {
		store.commit("token", null);
	},

	register: function(username, email, password, passwordRepeat, firstName, lastName, callback) {
		if(username) {
			if(password)
				password = encryption.pbkpdf2(password, username);
			if(passwordRepeat)
				passwordRepeat = encryption.pbkpdf2(passwordRepeat, username);
		}

		requestModel.register(username, email, password, passwordRepeat, firstName, lastName, result => {
			if(typeof callback === 'function')
				callback(result.success, result.message);
		})
	},

	getInfo: function(token, callback) {
		requestModel.account(token, result => {
			callback(result.success, result.message, result.data);
		});
	},

	addAddress: function(token, firstName, lastName, street, streetNr, city, zip, planet, dimension, callback) {
		requestModel.addresses.add(token, {
			 firstName: firstName,
			 lastName: lastName,
			 street: street,
			 streetNr: streetNr,
			 city: city,
			 zip: zip,
			 planet: planet,
			 dimension: dimension
		}, result => {
			if(typeof callback === 'function')
				callback(result.success, result.message, result.data);
		});
	},

	getAddress: function(token, callback) {
		requestModel.addresses.all(token, result => {
			var address = null;
			var success = result.success;

			if(success && result.data.length > 0)
				address = result.data[0];
			callback(success, result.message, address);
		});
	},

	addPayMethod: function(token, type, data, callback) {
		requestModel.payMethods.add(token, type, data, result => {
			if(typeof callback === 'function')
				callback(result.success, result.message, result.data);
		});
	},

	getPayMethod: function(token, callback) {
		requestModel.payMethods.all(token, result => {
			var payMethod = null;
			if(result.data.length > 0)
				payMethod = result.data[0];
			callback(result.success, result.message, payMethod);
		});
	}
}
