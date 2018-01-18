module.exports = function(app, database) {
	//========================
	// Products
	//========================
	app.get('/products/:page', function(req, res) {
		var page = req.params.page;

		console.log("/products GET request");

		database.getProducts(page, function(err, data) {
			res.json({
				success: true,
				message: '',
				data: data
			});
		});
	});
}
