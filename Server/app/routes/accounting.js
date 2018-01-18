module.exports = function(app, database) {
	//========================
	// Login
	//========================
	app.post('/login', function (req, res) {
		var username 	= req.body.username;
		var email 		= req.body.email;
		var pass 		= req.body.pass;

		console.log("/login POST request");

		database.loginUser(username, email, pass, function(err, data) {
			if(err) {
				res.json({
					success: false,
					message: err
				})
			} else {
				res.json({
					success: true,
					message: 'Login successfull',
					data: data
				});
			}
		});
	});


	//========================
	// Register
	//========================
	app.post('/register', function (req, res) {
		var username 	= req.body.username;
		var email 		= req.body.email;
		var firstName 	= req.body.first_name;
		var lastName 	= req.body.last_name;
		var pass 		= req.body.pass;
		var passRepeat 	= req.body.pass_repeat;

		console.log("/register POST request");

		database.addUser(username, email, firstName, lastName, pass, passRepeat, function(err) {
			if(err) {
				res.json({
					success: false,
					message: err
				});
			} else {
				res.json({
					success: true,
					message: 'Register successfull'
				});
			}
		});
	});
}
