'use static';

/**
 * Module dependencies.
 */

var security = require('./security');

require('../lib/string');

/**
 * Configuration
 */

const shopCfg = require('../cfg/shop');

/**
 * Database Model
 */
module.exports = class DatabaseModel {
	//========================
	// Constructor
	//========================
	constructor(connection) {
		this._connection = connection;
	}


	//========================
	// Add user
	//========================
	addUser(username, email, firstName, lastName, password, passwordRepeat, callback) {
		// Check values
		if(!(username && email && firstName && lastName && password && passwordRepeat))
			return callback("Empty values");

		if(password != passwordRepeat)
			return callback("Passwords don't match");

		// Trim values
		username = username.trim();
		email = email.trim();
		firstName = firstName.trim();
		lastName = lastName.trim();

		// Validate values (No need to escape them anymore)
		var usernameRegEx = /^[_a-zA-Z0-9]+$/;
		var nameRegEx = /^[a-zA-Z]+$/;

		if(!username.match(usernameRegEx))
			return callback("Invalid username. Only letters, numbers and underscores allowed");

		if(username.charAt(0) == '_')
			return callback("Invalid username. First character has to be a letter or number");

		if(!email.isEmail())
			return callback("Invalid email format");

		if(!firstName.match(nameRegEx))
			return callback("Invalid first name. Only letters allowed");

		if(!lastName.match(nameRegEx))
			return callback("Invalid last name. Only letters allowed");

		// Check if user existsname
		var connection = this._connection;

		var sql = `SELECT 1 FROM users WHERE Username='${username}'`;
		connection.query(sql, function (err, result, fields) {
			if(result && result.length > 0)
				return callback("Username already exists");

			// Doesn't exist yet -> hash password
			security.hashPassword(password, function(hash) {
				// Insert user into database
				var sql = `INSERT INTO users (ID, Username, Email, FirstName, LastName, IsAdmin, Password) VALUES (NULL, '${username}', '${email}', '${firstName}', '${lastName}', '0', '${hash}')`;
				connection.query(sql, function(err, result, fields) {
					if(err) throw err;
					callback();
				});
			});
		});
	}


	//========================
	// Login user
	//========================
	loginUser(username, email, password, callback) {
		// Check values
		if(!((username || email) && password))
			return callback("Empty values");

		var connection = this._connection;

		// Trim and escape
		username = username.trim();
		username = connection.escape(username);

		// Check database for user (based either on name or email)
		var sql = `SELECT ID,Password FROM users WHERE Username=${username}`;
		if(email) {
			// Trim and escape (again)
			email = email.trim();
			email = connection.escape(email);

			sql += ` OR Email=${email}`;
		}

		connection.query(sql, function(err, result, fields) {
			var authError = "Wrong E-Mail or password"; // No special error to avoid abuse

			// User not found
			if(!result || !result.length) return callback(authError);

			// Compare passwords
			security.comparePassword(password, result[0].Password, function(success) {
				if(success) {
					//console.log(result);
					var token = security.createToken(result[0].ID);
					return callback(null, { token: token });
				}
				// Passwords don't match
				callback(authError);
			});
		});
	}


	//========================
	// Get products
	//========================
	getProducts(page, callback) {
		// Check value
		if(page == null) throw new Error("Empty values");

		// Validate value
		page = parseInt(page);
		if(isNaN(page)) throw new Error("Page must be an integer");
		if(!page) throw new Error("Page must be greater than zero");

		// Calculations
		var itemsPerPage = shopCfg.itemsPerPage;

		var id = page - 1;

		var start = id * itemsPerPage;
		var end = (id + 1) * itemsPerPage;

		// Get products
		var sql = `SELECT * FROM products WHERE ID BETWEEN '${start}' AND '${end}'`;
		this._connection.query(sql, function (err, result, fields) {
			if (err) throw err;
			callback(null, result);
		});
	}


	//========================
	// Get purchases
	//========================
	getPurchases(userId, callback) { // TODO: Extend
		var sql = `SELECT * FROM purchases WHERE UserID='${userId}'`; // TODO: Use JOINs
		this._connection.query(sql, function (err, result, fields) {
			if(err) throw err;
			callback(result);
		});
	}


	//========================
	// Get adresses
	//========================
	getAdresses(userId, callback) { // TODO: Extend
		var sql = `SELECT * FROM adresses WHERE UserID='${userId}'`; // TODO: Use JOINs
		this._connection.query(sql, function (err, result, fields) {
			if(err) throw err;
			callback(result);
		});
	}


	//========================
	// Get pay methods
	//========================
	getPayMethods(userId, callback) {
		var sql = `SELECT * FROM paymethods WHERE UserID='${userId}'`;
		this._connection.query(sql, function (err, result, fields) {
			if(err) throw err;
			callback(result);
		});
	}
}
