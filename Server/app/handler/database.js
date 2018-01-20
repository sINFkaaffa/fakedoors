/**
 * Module dependencies.
 */
const sql 			= require('../cfg/sql');
const shopCfg  		= require('../cfg/shop');
const EventEmitter  = require('events').EventEmitter;

var mysql	 		= require('mysql');
var security 		= require('../lib/security');

require('../lib/string');

/**
 * Database Model
 */
class DatabaseModel extends EventEmitter {
	//========================
	// Constructor
	//========================
	constructor(host, user, password, db) {
		super();

		this._connection = mysql.createConnection({
			host: host,
			user: user,
			password: password,
			multipleStatements: true
		});

		this._database = db;
	}


	//========================
	// Escape
	//========================
	escape(str) {
		return this._connection.escape(str);
	}


	//========================
	// Initialize
	//========================
	init(callback) {
		// This was made a seperate method to create better readable class structure
		var self = this;

		var connection = this._connection;
		var database = this._database;

		// Check if database exists already
		connection.query(`SHOW DATABASES LIKE '${database}'`, function (err, result) {
			if(!result.length) { // Doesn't exist
				// Create database
				connection.query(`
					CREATE DATABASE ${database};
					USE ${database}`,

					function (err, result) {
						// Create tables
						connection.query(sql.tables.create, function(err, results) {
							  self.emit('ready'); // Fire ready event
						  });
					}
				)
			}
			else { // Already exists, so use it
				connection.query(`USE ${database}`, function(err, result) {
					self.emit('ready'); // Fire ready event
				});
			}
		});
	}



	//========================
	// Create tables
	//========================
	createTables(callback) {
		this._connection.query(sql.tables.create, function(err, result) {
			if(typeof callback === 'function')
				callback(err);
		});
	}


	//========================
	// Delete tables
	//========================
	deleteTables(callback) {
		this._connection.query(sql.tables.drop, function(err, result) {
			if(typeof callback === 'function')
				callback(err);
		});
	}


	//========================
	// Empty tables
	//========================
	emptyTables(callback) {
		this._connection.query(sql.tables.empty, function(err, result) {
			if(typeof callback === 'function')
				return callback(err);
		});
	}


	//========================
	// Add user
	//========================
	addUser(username, email, firstName, lastName, admin, password, callback) {
		// Shortcut
		function _callback(err, data) { if(typeof callback === 'function') callback(err, data); }

		// Validate values (No need to escape them anymore)
		var usernameRegEx = /^[_a-zA-Z0-9]+$/;
		var nameRegEx = /^[a-zA-Z]+$/;

		if(username.length < 4)
			return _callback("Invalid username. Use at least seven characters");

		if(firstName.length < 2)
			return _callback("Invalid first name. Use at least three characters");

		if(lastName.length < 2)
			return _callback("Invalid last name. Use at least three characters");

		if(!username.match(usernameRegEx))
			return _callback("Invalid username. Only letters, numbers and underscores allowed");

		if(username.charAt(0) == '_')
			return _callback("Invalid username. First character has to be a letter or number");

		if(!email.isEmail())
			return _callback("Invalid email format");

		if(!firstName.match(nameRegEx))
			return _callback("Invalid first name. Only letters allowed");

		if(!lastName.match(nameRegEx))
			return _callback("Invalid last name. Only letters allowed");

		// Bool to 0/1 string
		admin = (admin ? 1 : 0) + '';

		// Check if user existsname
		var connection = this._connection;

		var _sql = `SELECT 1 FROM users WHERE Username='${username}'`;
		connection.query(_sql, function (err, result, fields) {
			if(result && result.length > 0)
				return _callback("Username already exists");

			// Doesn't exist yet -> hash password
			security.hashPassword(password, function(hash) {
				// Insert user into database
				var __sql = sql.users.add(username, email, firstName, lastName, admin, hash);
				connection.query(__sql, function(err, result, fields) {
					if(err) throw err;
					_callback(null, result.insertId);
				});
			});
		});
	}


	//========================
	// Login user
	//========================
	loginUser(username, email, password, callback) {
		if(!((username || email) && password)) return callback("Empty values");

		var connection = this._connection;

		var columnName = "Username";
		if(email) columnName = "Email";

		// Create SQL statement
		var checkValue = username ? username : email;
		var condition = `${columnName}=${checkValue}`;
		var _sql = `SELECT ID,Password FROM users WHERE ${condition}`;

		// Run SQL statement
		connection.query(_sql, function(err, result, fields) {
			if(err) throw err;

			var authError = `Wrong ${columnName} or password`; // No special error to avoid abuse

			// User not found
			if(!result || !result.length) return callback(authError);

			// Compare passwords
			security.comparePassword(password, result[0].Password, function(success) {
				if(success) {
					var token = security.createToken(result[0].ID);
					return callback(null, { token: token });
				}
				// Passwords don't match
				callback(authError);
			});
		});
	}


	//========================
	// Get user by ID
	//========================
	getUserById(id, callback) {
		if(typeof callback !== 'function')
			throw new Error("Callback parameter invalid");

		var connection = this._connection;
		id = connection.escape(id);

		connection.query(sql.users.fromId(id), function(err, result) {
			if(err || !result.length)
				return callback("User not found", {});

			callback(null, {
				id: id,
				username: result[0].Username,
				email: result[0].Email,
				firstName: result[0].FirstName,
				lastName: result[0].LastName,
				admin: result[0].IsAdmin
			});
		});
	}


	//========================
	// Add product
	//========================
	addProduct(user, name, fullName, price, description, imagePath, quantity, callback) {
		if(user && !user.admin) {
			if(typeof callback === 'function')
				callback("User must be an admin to do that");
			return;
		}

		var connection = this._connection;

		// Prepare values
		name = connection.escape(name.trim());
		fullName = connection.escape(fullName.trim());
		price = connection.escape(price.trim());
		description = connection.escape(description.trim());
		imagePath = connection.escape(imagePath.trim());
		quantity = connection.escape(quantity.trim());

		// Run query
		var _sql = sql.products.add(name, fullName, price, description, imagePath, quantity);
		connection.query(_sql, function(err, result) {
			if(err) throw err;
		});
	}


	//========================
	// Get products
	//========================
	getProducts(page, callback) {
		// Calculations
		var itemsPerPage = shopCfg.itemsPerPage;

		var id = page - 1;

		var start = id * itemsPerPage;
		var end = (id + 1) * itemsPerPage;

		// Get products
		var _sql =
			`SELECT ID, Name, FullName, Price, Description, ImagePath, Quantity
			 FROM products
			 WHERE ID BETWEEN '${start}' AND '${end}'`;

		this._connection.query(_sql, function (err, result, fields) {
			if (err) throw err;

			var products = [];

			result.forEach(function(product) {
				products.push({
					id: product.ID,
            		name: product.Name,
					fullName: product.FullName,
					price: product.Price,
					description: product.Description,
					imagePath: product.ImagePath,
					quantity: product.Quantity
				})
			});
			callback(null, products);
		});
	}


	//========================
	// Get purchases
	//========================
	getPurchases(user, callback) { // TODO: Extend
		var _sql = `SELECT * FROM purchases WHERE UserID='${user.id}'`; // TODO: Use JOINs
		this._connection.query(_sql, function (err, result) {
			if(err) throw err;
			callback(null, result);
		});
	}


	//========================
	// Get addresses
	//========================
	getAddresses(user, callback) { // TODO: Extend
		var _sql = `SELECT * FROM addresses WHERE UserID='${user.id}'`; // TODO: Use JOINs
		this._connection.query(_sql, function (err, result, fields) {
			if(err) throw err;
			callback(null, result);
		});
	}


	//========================
	// Add address
	//========================
	addAddress(user, address, callback) {
		if(user && address.userId != user.id && !user.admin) {
			if(typeof callback === 'function')
				callback("User must be an admin to do that");
			return;
		}

		var name = address.firstName + " " + address.lastName;
		var street = address.street + " " + address.nr;

		var _sql = sql.addresses.add(address.userId, name, street, address.city, address.zip, address.dimension, address.planet, address.additional);
		this._connection.query(_sql, function(err, result) {
			callback(err, {
				id: result.insertId
			});
		});
	}


	//========================
	// Get pay methods
	//========================
	getPayMethods(user, callback) {
		var _sql = `SELECT * FROM paymethods WHERE UserID='${user.id}'`;
		this._connection.query(_sql, function (err, result, fields) {
			if(err) throw err;
			callback(null, result);
		});
	}
}

// Export function to provide config option with safe usage
module.exports = function(cfg, callback) {
	var host = cfg.host;
	var user = cfg.user;
	var password = cfg.password;
	var db = cfg.database;

	// Don't apply 'truthy' check on password to allow empty string
	if(!(host && user && password != null && db))
		throw new Error("Invalid configuration");

	var database = new DatabaseModel(host, user, password, db);
	database.init();

	return database;
}
