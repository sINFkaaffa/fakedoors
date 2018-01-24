module.exports = function(app, database) {
	//========================
	// Products
	//========================
	app.get('/products/:page', function(req, res) {
		var page = req.params.page;

		console.log("/products GET request");

		// Validate value
		if(page == null) throw new Error("Empty values");

		page = parseInt(page);
		if(isNaN(page)) throw new Error("Page must be an integer");
		if(!page) throw new Error("Page must be greater than zero");

		// Get products
		database.getProducts(page, function(err, data) {
			res.json({
				success: true,
				message: '',
				data: data
			});
		});
	});
}
