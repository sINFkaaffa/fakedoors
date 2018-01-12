module.exports = function(app, database) {
	app.post('/login', function (req, res, next) {
		var user = req.body.user;
		var email = req.body.email;
		var pass = req.body.pass;

		console.log("/login POST request")

		database.loginUser(user, email, pass, function(err) {
			if(err) return next(err);
			res.send("Success");
		});
	});

	app.post('/register', function (req, res, next) {
		var user = req.body.user;
		var email = req.body.email;
		var firstName = req.body.first_name;
		var lastName = req.body.last_name;
		var pass = req.body.pass;
		var passRepeat = req.body.pass_repeat;

		console.log("/register POST request")

		if(!(user && email && firstName && lastName && pass && passRepeat))
			return next("Empty fields");

		if(pass != passRepeat)
			return next("Passwords don't match");

		database.addUser(user, email, firstName, lastName, pass, function(err) {
			if(err) return next(err);
			res.send("Success");
		});
	});
}
