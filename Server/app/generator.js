/**
 * Dependencies
 */
const cfg 		= require('./cfg/generator');

const mySQLCfg	= require('./cfg/mysql');
var database 	= require('./models/database')(mySQLCfg);


/**
 * Data
 */
var firstNames = [ "Alex", "Katrin", "Simon", "Rick", "Morty", "Quentin", "Jean-Luc", "Francois", "Woody", "Ridley", "Martin", "Stanley", "Alfred", "David", "Orson", "Roman", "Tim", "Ingmar", "Akira" ];
var lastNames = [ "Roidl", "Affa", "Bräuer", "Sanchez", "Tarantino", "Godard", "Truffaut", "Allen", "Scott", "Scorsese", "Kubrick", "Hitchcock", "Lynch", "Welles", "Polanski", "Burton", "Bergman", "Kurosawa" ];
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


/**
 * Functions
 */
function rnd(max) {
	return Math.floor(Math.random() * max)
}

Array.prototype.rnd = function() {
	return this[rnd(this.length)];
}

function safeName(value) {
	value = value.replace(/ä/g, 'ae');
	value = value.replace(/ö/g, 'oe');
	value = value.replace(/ü/g, 'ue');
	value = value.replace(/ß/g, 'ss');
	value = value.replace(/-/g, '');

	return value;
}

/**
 * Where the magic happens
 */
console.log("===========================");
console.log("Generator booting up...");
console.log("===========================");

// Array to remember if a name did occure before
var usernames = []; // Array to remember if a name did occure before

// Users number is limited by max combinations of first and last name
var maxUsers = firstNames.length * lastNames.length;

for(var i = 0; i < maxUsers; i++) {
	var firstName = firstNames.rnd();
	var lastName = lastNames.rnd();
	var streetName = streetNames.rnd() + " " + rnd(cfg.adresses.maxNumber);
	var dimension = dimensions.rnd();
	var planet = planets.pre.rnd() + " " + planets.suff.rnd();
	var password = cfg.users.password; // Same password for every user

	// Random username
	var first, second;
	if(Math.random() >= 0.5) {
		first = firstName;
		second = lastName;
	} else {
		first = lastName;
		second = firstName;
	}

	// Random chance of using a number
	var useNumber = Math.random() >= 0.2;
	// Random chance of using it at beginning (otherwise at the end)
	var numberFirst = Math.random() >= 0.5;
	var protoName = safeName(first + second);

	var finalName = '';
	// Make sure its long enough and doesn't exist already
	while(finalName.length < 5 || usernames.includes(finalName)) {
		finalName = '';

		if(useNumber && numberFirst)
		 	finalName += rnd(100);

		var start = rnd(protoName.length);
		var end = start + rnd(protoName.length);
		if(end >= protoName.length) end = protoName.length - 1;

		finalName = protoName.slice(start, end);

		if(useNumber && !numberFirst)
		 	finalName += rnd(100);
	}
	usernames.push(finalName);

	// Add user to database
	database.addUser(finalName, "sample@mail.com", firstName, lastName, password, password, function(err, data) {
	});
}

console.log("Added " + usernames.length + " users");

console.log("===========================");
console.log("Generator finished!");
console.log("===========================");
