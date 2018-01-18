// Dependencies
var mysql = require('mysql');
var importer = require('node-mysql-importer');
var cfg = require('../cfg/mysql');

// Prepare by configuring importer and MySQL
var importerCfg = cfg;
importerCfg.database = cfg.db;
importer.config(importerCfg);

var connection = mysql.createConnection({
	host: cfg.host,
	user: cfg.user,
	password: cfg.password
});

// Connect!
connection.connect(function(err) {
	if (err) throw err;

	console.log("MYSQL successfully connected!");

	var db = cfg.db;

	// Check if database exists
	connection.query(`SHOW DATABASES LIKE '${db}'`, function (err, result) {
		// Database doesn't exist
		if(!result.length) {
			console.log(`Database ${db} doesn't exist yet.`);

			// Create and use it
			connection.query(`CREATE DATABASE ${db} DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
			connection.query(`USE ${db}`);

			// Execute install script
			importer.importSQL(cfg.installScript).then(() => {
				console.log(`Database ${db} was successfully installed.`);
			}).catch(err => {
				connection.query(`DROP '${db}'`);
				throw new Error("Database creating failed: ${err}");
			});
		} else connection.query("USE " + db); // Use existing DB
	});
});

// Export final connection
module.exports = connection;
