module.exports = function(dbHandler) {
	//var authorize = new Authorize(db, req.decoded);

	return { // TODO: Implement
		// Public
			// Accounting
			login: function() {},
			register: function(username, email, firstName, lastName, password, passwordRepeat, callback) {
				// Check values
				if(!(username && email && firstName && lastName && password && passwordRepeat))
					return callback("Empty values");

				if(password != passwordRepeat)
					return callback("Passwords don't match");

				// Trim values
				username = username.trim();
				email = email.trim();
				firstName = firstName.trim();
				lastName = lastName.trim();

				dbHandler.addUser(username, email, firstName, lastName, false, password, function(err, id) {
					if(err) return callback(err); // Do something

					callback();
				});
			},
			products: {
				all: function() {},
				add: function() {} // Admin only
			},
		// Protected
		account: function() {},
		purchases: {
			all: function() {},
			add: function() {} // Admin only
		},
		adresses: function() {},
		paymethods: function() {},
		pdf: function() {}
	};
}
