module.exports = function(app, database) {
	//========================
	// Purchases
	//========================
	app.get('/purchases', function(req, res) {
		var userId = req.decoded.id;

		console.log("/purchases GET request");

		database.getPurchases(userId, function(data) {
			res.json({
				success: true,
				message: '',
				data: data
			});
		});
	});


	//========================
	// Adresses
	//========================
	app.get('/adresses', function(req, res, next) {
		var userId = req.decoded.id;

		console.log("/adresses GET request");

		database.getAdresses(userId, function(data) {
			res.json({
				success: true,
				message: '',
				data: data
			});
		});
	});


	//========================
	// Pay methods
	//========================
	app.get('/paymethods', function(req, res, next) {
		var userId = req.decoded.id;

		console.log("/paymethods GET request");

		database.getPayMethods(userId, function(data) {
			res.json({
				success: true,
				message: '',
				data: data
			});
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
