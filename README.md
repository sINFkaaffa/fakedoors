# Fakedoors.com

Webtechnologie-Projekt 2017 von
Simon Bräuer, Alex Roidl und Karin Affa

[Live Version](https://sinfkaaffa.github.io/fakedoors/)

Fakedoors wird professioneller „Fakedoors“-Online-Shop.
Dieser Webstore wird in einer Folge von der bekannten Serie Rick & Morty vorgestellt, daher soll die Marke "Rick & Morty" präsent sein.

### Benötigt

* Node (https://nodejs.org/en/)
* MySQL Server

### Features

* User Stories: Warenkorb mit allen Bestellungen, Benutzerkonto usw.
* Advanced Toolkit: Vue
* Back-End: Node
* Database: MySQL
* Deployed via Docker# Fakedoors.com


# Server
* **MySQL Zugangsdaten Konfiguration unter */Server/app/cfg/mysql.js*!**
* **Empfohlen:**
	Nodemon für beständiges Neustarten bei Änderungen während der Entwicklung
	``` npm install -g nodemon ```

* **Abhängigkeiten installieren:**
	* ``` npm install```

* **Generator:**
	* **Konfiguration:**
		* ``` /app/cfg/generator.js```
	* **Datenbank befüllen:**
		* ``` npm run generate```
	* **Datenbank leeren:**
		* ``` npm run emptydb```
	* **Datenbank zurücksetzen:**
		* ``` npm run resetdb```
	* **Root-User anlegen:** (Standartpasswort: "root")
		* ``` npm run root```

* **Starten:**
	* Mit Nodemon:
		* ``` nodemon npm start```
	* Ohne Nodemon:
		* ``` npm start```
	* Sicherer Modus:
		* (```nodemon```) ```  npm start safe```

* **Requests:**
	* (**POSTman Kollektion:** /Server/Fakedoors.postman_collection.json)

	* **GET**
		* / **Statisches Verzeichnis (index.html)**
		* **Öffentlich:**
			* /products/[seite] z.B. "/products/2" ("Öffentllich")
				* Parameter durch URL (Siehe Beispiel)
				* Rückgabe: *JSON*
			* /product/[id]
				* Parameter durch URL
				* Rückgabe: *JSON*
		* **Geschützt:**
			* **Token-Übergabe durch Header-Key "x-access-token"**
			* /account
				* Rückgabe: *JSON*
			* /purchases
				* Rückgabe: *JSON*
			* /purchases/[bestellungs_id]
				* Parameter durch URL
				* Rückgabe: *JSON*
			* /purchases/[bestellungs_id]/pdf
				* Parameter durch URL
				* Rückgabe: *PDF-Datei*
			* /addresses
				* Rückgabe: *JSON*
			* /paymethods
				* Rückgabe: *JSON*

	* **POST**
		* **HEADER:** ```Content-Type``` ```application/x-www-form-urlencoded```
		* **Öffentlich:**
			* /login
				* Parameter: *username, email, password* **User oder Email UND Passwort werden benötigt!**
				* Rückgabe: *JSON* **(Enthält TOKEN)**
			* /register
				* Parameter: *username, email, first_name, last_name, password, password_repeat*
				* Rückgabe: *JSON*
		* **Geschützt:**
			* **Token-Übergabe durch Header-Key "x-access-token"**
			* /adresses/add
				* Parameter: **(firstName, )(lastName, )street, street_nr, city, zip, planet, dimension(, userId)** *(userId nur für Admins)*
				* Rückgabe: *JSON*
			* /paymethods/add
				* Parameter: **type, data**
				* Rückgabe: *JSON*
			* /products/add (Nur für Admins)
				* Parameter: **name, full_name, price, description, image_path, quantity**
				* Rückgabe: *JSON*
			* /purchases/new
				* Parameter: address_id, paymethod_id, data
				* Rückgabe: *JSON*
