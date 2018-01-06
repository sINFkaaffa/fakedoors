module.exports = function(router, connection) {
	router.get('/purchases/:userId', function(req, res, next) {
		var sql = "SELECT * FROM purchases WHERE UserID='" + req.params.userId + "'";
		connection.query(sql, function (err, result, fields) {
			res.send(result);
		});
	});

	router.get('/adresses', function(req, res, next) {
	});

	router.get('/paymethods', function(req, res, next) {
	});
}
