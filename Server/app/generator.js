/**
 * Dependencies
 */
const cfg 		= require('./cfg/generator');
const mySQLCfg	= require('./cfg/mysql');

var database 	= require('./handler/database')(mySQLCfg);
var random 		= require('./lib/random');

/**
 * Data
 */



/**
 * Basic functions
 */
Array.prototype.rnd = function() {
	return this[random.max(this.length)];
}

function safeName(value) {
	value = value.replace(/ä/g, 'ae');
	value = value.replace(/ö/g, 'oe');
	value = value.replace(/ü/g, 'ue');
	value = value.replace(/ß/g, 'ss');
	value = value.replace(/-/g, '');

	return value;
}

function printHeader(msg) {
	const char = "=";
	const length = 38;

	var line = '';
	for(var i = 0; i < length; i++) line += char;

	console.log(line);
	console.log(' ' + msg);
	console.log(line);
}

function english(str) {
	str = str.toLowerCase();
	return str.charAt(0).toUpperCase() + str.slice(1);
}


/**
 * Where the magic happens
 */
 var generate = {
	 products: function() {
		var colors = {
			pre: [ "Antique", "Cosmic", "Old", "Ghost", "Ash", "Noir", "Midnight", "Outer space", "Galaxy", "Star", "Ultraviolet" ],
			suff: [ "White", "Grey", "Black", "Magenta", "Pink", "Red", "Brown", "Orange", "Yellow", "Green", "Cyan", "Blue", "Violet" ]
		};
		var types = [ "Hinged Patio", "Sliding Patio", "Scenescape", "Entry", "Storm" ];

		var max = random.range(cfg.products.min, cfg.products.max);
		var _price = cfg.products.price;
		var _quantity = cfg.products.quantity;

		for(var i = 0; i < max; i++) {
			var color = colors.pre.rnd() + ' ' + colors.suff.rnd();
			var type = types.rnd();
			var fullName = english(color + ' ' + type);
			var imagePath = "http://elevweb.skit.no/2005erol/fakedoors/images/doors/door6.png";
			var price = random.range(_price.min, _price.max);
			var quantity = random.range(_quantity.min, _quantity.max) + ' ';
			var description = "No description yet";

			if(random.bool()) price /= (cfg.products.price.digits * 10);
			price = price + '';

			var name = fullName.replace(/\s/g, '-');
			name = name.toLowerCase();

			fullName += " door";

			database.addProduct(null, name, fullName, price, description, imagePath, quantity);
		}
	 },

	 names: function() {
		 var firstNames = [ "Alex", "Katrin", "Simon", "Rick", "Morty", "Quentin", "Jean-Luc", "Francois", "Woody", "Ridley", "Martin", "Stanley", "Alfred", "David", "Orson", "Roman", "Tim", "Ingmar", "Akira" ];
		 var lastNames = [ "Roidl", "Affa", "Bräuer", "Sanchez", "Tarantino", "Godard", "Truffaut", "Allen", "Scott", "Scorsese", "Kubrick", "Hitchcock", "Lynch", "Welles", "Polanski", "Burton", "Bergman", "Kurosawa" ];

		 // Array to remember if a name did occure before
		 var usernames = []; // Array to remember if a name did occure before

		 // Users number is limited by max combinations of first and last name
		 var maxUsers = firstNames.length * lastNames.length;

		 for(var i = 0; i < maxUsers; i++) {
			 var firstName = firstNames.rnd();
			 var lastName = lastNames.rnd();
			 var password = cfg.users.password; // Same password for every user

			 // Random username
			 var first, second;
			 if(random.bool()) {
				 first = firstName;
				 second = lastName;
			 } else {
				 first = lastName;
				 second = firstName;
			 }

			 // Random chance of using a number
			 var useNumber = Math.random() >= 0.2;
			 // Random chance of using it at beginning (otherwise at the end)
			 var numberFirst = random.bool();
			 var protoName = safeName(first + second);

			 var finalName = '';
			 // Make sure its long enough and doesn't exist already
			 while(finalName.length < 5 || usernames.includes(finalName)) {
				 finalName = '';

				 if(useNumber && numberFirst)
					 finalName += random.max(100);

				 var start = random.max(protoName.length);
				 var end = start + random.max(protoName.length);
				 if(end >= protoName.length) end = protoName.length - 1;

				 finalName = protoName.slice(start, end);

				 if(useNumber && !numberFirst)
					 finalName += random.max(100);
			 }
			 usernames.push(finalName);

			 // Add user to database
			 database.addUser(finalName, "sample@mail.com", firstName, lastName, password, password, function(err, data) {
			 });
		 }
		 return usernames.length;
	 },

	 adresses: function() {
		 var streetNames = [ "Kühlwetterstraße", "Zur Hölle", "Knochenmühle", "Holunderflosse", "Feierabendweg", "Tangabucht", "Kniebrecher", "Beamtenlaufbahn", "Auf dem Jochen", "Promilleweg" ];
		 var dimensions = [
			"C-132", "Blender Dimension", "Blumbus Dimension", "Buttworld", "C-726", "Corn Universe", "Cromulon Dimension", "Cronenberg World",
			"Dimension 304-X", "Dimension 35-C", "Dimension'\\", "Dimension 9-2184C", "Dimension C-137", "Dimension C-4499", "Dimension C-500A",
			"Dog Dimension", "Doopidoo Dimension", "Greasy Grandma World", "Hamster in Butt World", "Pantless Universe", "Phone Universe",
			"Pizza Universe", "Post-Apocalyptic Dimension", "Replacement Dimension", "Reverse Height Dimension", "Testicle Monster Dimension"
		 ];
		 var planets = {
			pre: [ "Pulp", "Django", "Jackie", "Reservoir", "Hateful", "Four", "True" ],
			suff: [ "Fiction", "Unchained", "Brown", "Dogs", "Eight", "Rooms", "Romance" ]
		 }
         //
		 // var streetName = streetNames.rnd() + " " + random.max(cfg.adresses.maxNumber);
		 // var dimension = dimensions.rnd();
		 // var planet = planets.pre.rnd() + " " + planets.suff.rnd();

		 // TODO: Implement
	 }
 };

 /**
  * Modes
  */

function defaultMode() { // Generate everything
	printHeader("Generator booting up [MODE: Default]");

	generate.products();
	generate.names();
	//generate.adresses();
	//generate.purchases();

	printHeader("Generating finished!");
}

function resetMode() { // Empty tables
	 printHeader("Generator booting up [MODE: Reset]");

	 database.empty();

	 printHeader("Resetting finished!");
}


/**
 * Handle command line arguments
 */

// Wait for database connection to be ready
database.on("ready", () => {
	// Get command line arguments
	var params = process.argv;

	// No additional arguments
	if(params.length <= 2 || params[2] == 'default') { // Default mode
		defaultMode();
	} else {
		params = params.slice(2); // Only safe relevant params

		switch(params[0]) {
			case 'reset': {
				resetMode();
				break;
			}
		}
	}
});
