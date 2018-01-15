module.exports = function(router, connection) {
	router.get('/products/:page', function(req, res, next) {
		const itemsPerPage = 50;

		var id = req.params.page - 1;
		if(id < 0) id = 0;

		var start = id * itemsPerPage;
		var end = (id + 1) * itemsPerPage;

		var sql = "SELECT * FROM doors WHERE ID BETWEEN '" + start + "' AND '" + end + "'";
		connection.query(sql, function (err, result, fields) {
		    if (err) throw err;
			res.send(result);
		});
	});
}
