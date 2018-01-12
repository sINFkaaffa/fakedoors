module.exports = function(app, database) {
	app.get('/products/:page', function(req, res, next) {
		var page = req.params.page;

		console.log("/products GET request")

		if(!page) return next('No page number given');

		database.getProducts(page, function(err, products) {
			if(err) return next(err);
			res.send(products);
		});
	});
}
