module.exports = function(app, database) {
	app.post('/login', function (req, res) {
		// var user = req.body.user;
		// var sql = `SELECT Password FROM users WHERE Username='${user}'`;
        //
		// connection.query(sql, function (err, result, fields) {
		//     if (err) throw err;
        //
		// 	// Found matching users
		// 	if(result.length) {
		// 		if(req.body.pw == result[0]["Password"]) res.send(true); // PW is matching
		// 		else res.send(false);
		// 	} else res.send(false);
		// });
	});

	app.post('/register', function (req, res, next) {
		var user = req.body.user;
		var email = req.body.email;
		var firstName = req.body.first_name;
		var lastName = req.body.last_name;
		var pass = req.body.pass;
		var passRepeat = req.body.pass_repeat;

		if(!(user && email && firstName && lastName && pass && passRepeat))
			return next("Empty fields");

		if(pass != passRepeat)
			return next("Passwords don't match");

		database.addUser(user, email, firstName, lastName, pass, function(err) {
			if(err) return next(err);
			res.redirect('/');
		});
	});
}
