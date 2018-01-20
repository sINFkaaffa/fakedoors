module.exports = {
	tables: {
		create: `
			CREATE TABLE addresses (
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
				Price double,
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
		  	)`,

		drop: `
			DROP TABLE IF EXISTS users;
			DROP TABLE IF EXISTS products;
			DROP TABLE IF EXISTS addresses;
			DROP TABLE IF EXISTS purchases;
			DROP TABLE IF EXISTS paymethods`,

		empty: `
			TRUNCATE TABLE users;
			TRUNCATE TABLE products;
			TRUNCATE TABLE addresses;
			TRUNCATE TABLE purchases;
			TRUNCATE TABLE paymethods`,
	},
	addresses: {
		add: function(userId, name, street, city, zip, dimension, planet, additional) {
			return `
				INSERT INTO addresses
				(ID, UserID, Name, Street, City, ZIP, Dimension, Planet, Additional)
				VALUES
				(null, ${userId}, ${name}, ${street}, ${city}, ${zip}, ${dimension}, ${planet}, ${additional})`
		}
	},
	products: {
		add: function(name, fullName, price, description, imagePath, quantity) {
			return `
				INSERT INTO products
				(ID, Name, FullName, Price, Description, ImagePath, Quantity)
				VALUES
				(null, ${name}, ${fullName}, ${price}, ${description}, ${imagePath}, ${quantity})`;
		}
	},
	users: {
		add: function(username, email, firstName, lastName, admin, password) {
			return `
				INSERT INTO users
				(ID, Username, Email, FirstName, LastName, IsAdmin, Password)
				VALUES
				(NULL, '${username}', '${email}', '${firstName}', '${lastName}', '${admin}', '${password}')`
		},

		fromId: function(id) {
			return `
				SELECT
				Username, Email, FirstName, LastName, IsAdmin
				FROM
				users
				WHERE ID=${id}`;
		}
	}
}
