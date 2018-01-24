var response = require('../handler/response');

module.exports = function(app, database) {
	//========================
	// Account
	//========================
	app.get('/account', function(req, res) {
		var userId = req.decoded.id;

		console.log("/account GET request");

		database.getUserById(userId, function(err, data) {
			if(err) {
				res.status(403).json({
					success: false,
					message: err
				});
			} else {
				delete data.id;

				res.json({
					success: true,
					message: '',
					data: data
				});
			}
		});
	});

	//========================
	// Purchases
	//========================
	app.get('/purchases', function(req, res) {
		var userId = req.decoded.id;

		console.log("/purchases GET request");

		database.getPurchases(userId, function(err, data) {
			if(err) {
				res.status(403).json({
					success: false,
					message: err
				})
			} else {
				res.json({
					success: true,
					message: '',
					data: data
				});
			}
		});
	});


	//========================
	// Addresses
	//========================
	app.get('/addresses', function(req, res, next) {
		var userId = req.decoded.id;

		console.log("/addresses GET request");

		database.getAddresses(userId, function(err, data) {
			if(err) {
				res.status(403).json({
					success: false,
					message: err
				})
			} else {
				res.json({
					success: true,
					message: '',
					data: data
				});
			}
		});
	});


	//========================
	// Add address
	//========================
	app.post('/addresses/add', function(req, res, next) {
		var userId = req.decoded.id;

		console.log("/addresses/add POST request");

		var address = {
			userId: req.body.userId,
			firstName: '',
			lastName: '',
			street: '',
			nr: '',
			city: '',
			zip: '',
			planet: req.body.planet,
			dimension: req.body.dimension,
			additional: ''
		};
		// escape address
		for(var key in address) {
			if(address[key] != null)
				address[key] = database.escape(address[key].trim())
		}

		// Save address for right user
		database.getUserById(userId, function(err, user) {
			if(!address.userId) address.userId = userId;
			database.addAddress(user, address,
				function(err, data) {
					if(err) {
						res.status(403).json({
							success: false,
							message: err
						})
					} else {
						res.json({
							success: true,
							message: 'Address successfully added',
							data: data
						});
					}
				}
			);
		});
	});


	//========================
	// Pay methods
	//========================
	app.get('/paymethods', function(req, res, next) {
		var userId = req.decoded.id;

		console.log("/paymethods GET request");

		database.getPayMethods(userId, function(err, data) {
			if(err) {
				res.status(403).json({
					success: false,
					message: err
				})
			} else {
				res.json({
					success: true,
					message: '',
					data: data
				});
			}
		});
	});


	//========================
	// PDF from order
	//========================
	app.get('/pdf/:order_id', function(req, res, next) { // TODO: Implement
		console.log("/pdf GET request");

		res.status(404).json({
			success: false,
			message: 'Not implemented yet'
		});
	});
}
