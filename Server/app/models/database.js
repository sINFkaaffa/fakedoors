'use static';

var bcrypt = require('bcrypt');

module.exports = class DatabaseModel {
	constructor(connection) {
		this._connection = connection;
	}

	addUser(name, email, firstName, lastName, password, callback) {
		var connection = this._connection;

		var sql = `SELECT 1 FROM users WHERE Username='${name}'`;
		connection.query(sql, function (err, result, fields) {
			if(result.length > 0)
				return callback(new Error("Username already exists"));

			bcrypt.hash(password, 10, function (err, hash){
				if (err) return callback(err);
				else {
					var sql = `INSERT INTO users (ID, Username, Email, FirstName, LastName, Password) VALUES (NULL, '${name}', '${email}', '${firstName}', '${lastName}', '${hash}')`;
					connection.query(sql, function(err, result, fields) {
						callback(err ? err : null);
					});
				}
			});
		});
	}

	loginUser(name, email, password, callback) {
		if(!((name || email) && password))
			return callback(new Error("Name or E-Mail and password required"));

		var sql = `SELECT Password FROM users WHERE Username='${name}'`;
		this._connection.query(sql, function(err, result, fields) {
			var authError = new Error("Authentification failed");

			if(!result.length) return callback(authError);

			bcrypt.compare(password, result[0].Password, function(err, res) {
				if(res) return callback();
				return callback(authError);
			});
		});
	}

	getProducts(page, callback) {
		const itemsPerPage = 50;

		var id = page - 1;
		if(id < 0) id = 0;

		var start = id * itemsPerPage;
		var end = (id + 1) * itemsPerPage;

		var sql = `SELECT * FROM products WHERE ID BETWEEN '${start}' AND '${end}'`;
		this._connection.query(sql, function (err, result, fields) {
			if (err) return callback(err, []);
			return callback(null, result);
		});
	}

	getPurchases(userId, callback) {
		var sql = `SELECT * FROM purchases WHERE UserID='${id}'`;
		this._connection.query(sql, function (err, result, fields) {
			if(err) return callback(err);
			return callback(null, result);
		});
	}
}
