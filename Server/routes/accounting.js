module.exports = function(app, connection) {
	app.get('/login/:user/:pw', function (req, res) {
		var sql = "SELECT Password FROM users WHERE Username='" + req.params.user + "'";
		connection.query(sql, function (err, result, fields) {
		    if (err) throw err;

			// Found matching users
			if(result.length > 0) {
				if(req.params.pw == result[0]["Password"]) res.send(true); // PW is matching
				else res.send(false);
			} else res.send(false);
		});
	});

	app.get('/register/:user/:pass', function (req, res) {
		var sql = "INSERT INTO `users`(`ID`, `Username`, `Email`, `FirstName`, `LastName`, `Password`) VALUES (NULL,'"  + req.params.user + "','','','','" + req.params.pass + "')";
		connection.query(sql, function (err, result, fields) {
		    if (err) res.send(false);
			else res.send(true);
		});
	 //
	});
}
