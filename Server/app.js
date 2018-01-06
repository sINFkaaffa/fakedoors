#!/usr/bin/env node

/**
 * Configuration
 */

const mysqlCfg = {
	host: "localhost",
	user: "root",
	password: "",
	database: "fakedoor",
	install: "database.sql"
};

/**
 * Module dependencies.
 */

var express = require('express');
var debug = require('debug')('fakedoors:server');
var http = require('http');
var mysql = require('mysql');
var importer = require('node-mysql-importer');

 var app = express();

/**
 * Establish connection
 */

importer.config(mysqlCfg);

var connection = mysql.createConnection({
	host: mysqlCfg.host,
	user: mysqlCfg.user,
	password: mysqlCfg.password
});

connection.connect(function(err) {
	if (err) throw err;

	console.log("MYSQL successfully connected!");

	var db = mysqlCfg.database;

	// Check if database exists
	connection.query("SHOW DATABASES LIKE '" + db + "'", function (err, result) {
		// Database doesn't exist
		if(!result.length) {
			console.log("Database " + db + " doesn't exist yet.");

			// Create and use it
			connection.query("CREATE DATABASE " + db + " DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
			connection.query("USE " + db);

			// Execute install script
			importer.importSQL(mysqlCfg.install).then(() => {
		        console.log("Database " + db + " was successfully installed.")
		    }).catch( err => {
		        console.log("Database creating failed: ${err}");
		    });
		} else connection.query("USE " + db); // Use existing DB
	});
});

/**
 * Routes
 */

var accountingRouter = require('./routes/accounting');
var productsRouter = require('./routes/products');
var userRouter = require('./routes/user');

accountingRouter(app, connection);
productsRouter(app, connection);
userRouter(app, connection);

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is alread, connectiony in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
