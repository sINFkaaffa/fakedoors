module.exports = function(app, responseHandler) {
	//========================
	// Products
	//========================
	app.get('/products', function(req, res) {
		res.redirect('/products/1');
	});

	app.get('/products/:page', function(req, res) {
		var page = req.params.page;

		console.log("/products GET request");

		responseHandler.products.all(page, function(err, data) {
			if(err) {
				res.sendStatus(500).json({
					success: false,
					message: err
				});
			} else {
				res.json({
					success: true,
					data: data
				});
			}
		});
	});
}
