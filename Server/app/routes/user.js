module.exports = function(app, database) {
	app.post('/purchases', function(req, res, next) {
		var id = req.body.userId;

		if(!id) return next("No user ID given");

		database.getPurchases(id, function(err, purchases) {
			if(err) return next(err);
			res.send(purchases);
		});
	});

	app.post('/adresses', function(req, res, next) {
	});

	app.post('/paymethods', function(req, res, next) {
	});
}
