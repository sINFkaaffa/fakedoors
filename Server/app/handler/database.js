/**
 * Module dependencies.
 */
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
						connection.query(`
							CREATE TABLE adresses (
								ID int(11) AUTO_INCREMENT PRIMARY KEY,
								UserID int(11),
								Name varchar(64),
								Street varchar(128),
								City varchar(64),
								ZIP int(11),
								Dimension varchar(64),
								Planet varchar(64),
								Additional varchar(256)
							);

							CREATE TABLE products (
							  ID int(11) AUTO_INCREMENT PRIMARY KEY,
							  Name char(64) COMMENT 'Short description',
							  FullName varchar(128),
							  Price mediumint(9),
							  Description text,
							  ImagePath tinytext,
							  Quantity int(11)
							);

							CREATE TABLE paymethods (
							  ID int(11) AUTO_INCREMENT PRIMARY KEY,
							  UserID int(11),
							  Type enum('Paypal','Bank','Bitcoin','Bill'),
							  Data mediumtext COMMENT 'JSON'
							);

							CREATE TABLE purchases (
							  ID int(11) AUTO_INCREMENT PRIMARY KEY,
							  UserID int(11),
							  PaymentID int(11),
							  AdressID int(11),
							  Data mediumtext COMMENT 'JSON (Product, Quantity)',
							  Time datetime DEFAULT CURRENT_TIMESTAMP
							);

							CREATE TABLE users (
							  ID int(11) AUTO_INCREMENT PRIMARY KEY,
							  Username varchar(64),
							  Email varchar(128),
							  FirstName varchar(64),
							  LastName varchar(64),
							  IsAdmin tinyint(1),
							  Password varchar(512) COMMENT 'Hashed'
						  )`, function(err, results) {
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
	// Empty (all tables)
	//========================
	empty() {
		this._connection.query(`
			TRUNCATE TABLE users;
			TRUNCATE TABLE products;
			TRUNCATE TABLE adresses;
			TRUNCATE TABLE purchases;
			TRUNCATE TABLE paymethods`);
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
		if(!((username || email) && password)) return callback("Empty values");

		var connection = this._connection;

		var columnName = "Username";
		if(email) columnName = "Email";

		// Create SQL statement
		var checkValue = username ? username : email;
		var condition = `${columnName}=${checkValue}`;
		var sql = `SELECT ID,Password FROM users WHERE ${condition}`;

		// Run SQL statement
		connection.query(sql, function(err, result, fields) {
			if(err) throw err;

			var authError = `Wrong ${columnName} or password`; // No special error to avoid abuse

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
		var sql = `INSERT INTO products (ID, Name, FullName, Price, Description, ImagePath, Quantity) VALUES (null, ${name}, ${fullName}, ${price}, ${description}, ${imagePath}, ${quantity})`;
		connection.query(sql, function(err, result) {
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
		var sql =
			`SELECT ID, Name, FullName, Price, Description, ImagePath, Quantity
			 FROM products
			 WHERE ID BETWEEN '${start}' AND '${end}'`;

		this._connection.query(sql, function (err, result, fields) {
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
	// Get user by ID
	//========================
	getUserById(id, callback) {
		var sql = `SELECT Username,Email,FirstName,LastName,IsAdmin FROM users WHERE ID=${id}`;
		this._connection.query(sql, function(err, result) {
			if(err) throw err;

			callback(null, {
				username: result[0].Username,
				email: result[0].Email,
				firstName: result[0].FirstName,
				lastName: result[0].LastName,
				admin: result[0].IsAdmin
			});
		});
	}


	//========================
	// Get purchases
	//========================
	getPurchases(user, callback) { // TODO: Extend
		var sql = `SELECT * FROM purchases WHERE UserID='${user.id}'`; // TODO: Use JOINs
		this._connection.query(sql, function (err, result) {
			if(err) throw err;
			callback(null, result);
		});
	}


	//========================
	// Get adresses
	//========================
	getAdresses(user, callback) { // TODO: Extend
		var sql = `SELECT * FROM adresses WHERE UserID='${user.id}'`; // TODO: Use JOINs
		this._connection.query(sql, function (err, result, fields) {
			if(err) throw err;
			callback(null, result);
		});
	}


	//========================
	// Get pay methods
	//========================
	getPayMethods(user, callback) {
		var sql = `SELECT * FROM paymethods WHERE UserID='${user.id}'`;
		this._connection.query(sql, function (err, result, fields) {
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
