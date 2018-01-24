/**
 * Module dependencies.
 */
const mySQLCfg	= require('./cfg/mysql');
const sql = require('./cfg/sql');

var express 	= require('express');
var http 		= require('http');
var bodyParser 	= require('body-parser');
var path 		= require('path');

var security	= require('./lib/security');

var database 	= require('./handler/database')(mySQLCfg);

/**
 * Get arguments
 */
var args = process.argv.slice(2); // Only use extra params
while(args[0] == 'npm') args = args.slice(2); // Cut off npm params if provided


/**
 * Start modes (based off arguments)
 */
if(args.length > 0) {
	switch(args[0]) {
		// Reset mode
		case 'safe': {
			database.on("ready", function() {
				// Delete and re-create all tables
				database.deleteTables(function(err) {
					var pre = "[RESET-MODE] ";
					if(!err) database.createTables(() => {
						console.log("[DATABASE:RESET-MODE] Re-created all tables")
					})
					else console.log(`[DATABASE:RESET-MODE] Error re-creating all tables: "${err}"`);
				})
			});
			break;
		}
	}
}

/**
 * Database
 */
database.on("ready", () => {
	console.log("[DATABASE] Successfully connected");
});


/**
 * Middleware
 */
var app = express();

// Used for parsing incoming request bodies
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Provides static directory
app.use('/', express.static(path.join(__dirname, 'public')));

// Used to control access
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);

	// Intercept OPTIONS method
	if ('OPTIONS' == req.method) {
		res.send(200);
	} else next();
});

/**
 * Routes
 */
var accountingRouter = require('./routes/accounting');
var publicRouter 	 = require('./routes/public');
var userRouter  	 = require('./routes/user');

accountingRouter(app, database);
publicRouter(app, database);

// Protection middleware
app.use(function(req, res, next) {
	var token = req.headers['x-access-token'];

	if(token) {
		security.verifyToken(token, function(err, decoded) {
			if(err) {
				res.json({
					success: false,
					message: 'Token authentification failed'
				});
			} else {
				req.decoded = decoded; // Save decoded object for later use
				next();
			}
		});
	} else {
		res.status(403).json({
			success: false,
			message: 'No token found'
		})
	}
});

userRouter(app, database);

/**
 * Create HTTP server
 */
var port = 3000;
app.set('port', port);

var server = http.createServer(app);

/**
 * Listen on provided port
 */
server.listen(port);
server.on('listening', function() {
	console.log("Party started on Port " + port + "!");
});
