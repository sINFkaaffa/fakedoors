'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var debug = require('debug')('fakedoors:server');
var http = require('http');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

/**
 * Establish connection
 */

var connection = require('./connection');

/**
 * Middleware
 */

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/', express.static(path.join(__dirname, 'public'))) // Static directory

/**
 * Session
 */

app.use(session({
  secret: '42 fortytwo 42',
  resave: true,
  saveUninitialized: false
}));

/**
 * Database
 */

const DatabaseModel = require('./models/database');
var database = new DatabaseModel(connection);

/**
 * Routes
 */

var accountingRouter = require('./routes/accounting');
var productsRouter = require('./routes/products');
var userRouter = require('./routes/user');

accountingRouter(app, database);
productsRouter(app, database);
userRouter(app, database);

/**
 * Create HTTP server.
 */

var port = 3000;
app.set('port', port);

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== 'listen')
		throw error;

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
