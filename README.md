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
* Deployed via Docker
* Design Framework: Materialize (http://materializecss.com/)

# Server
* **MySQL Zugangsdaten Konfiguration unter */Server/app/cfg/mysql.js*!**
* **Empfohlen:**
	Nodemon für beständiges Neustarten bei Änderungen während der Entwicklung
	``` npm install -g nodemon ```

* **Abhängigkeiten installieren:**
	* ``` cd Server && npm install```

* **Starten:**
	* ``` cd Server ```
	* Mit Nodemon:
		* ``` nodemon npm start```
	* Ohne Nodemon:
		* ``` npm start```

* **Requests:**
	* (**POSTman Kollektion:** /Server/Fakedoors.postman_collection.json)

	* **GET**
		* / **Statisches Verzeichnis (index.html)**
		* **Öffentlich:**
			* /products/[seite] z.B. "/products/2" ("Öffentllich")
				* Parameter durch URL (Siehe Beispiel)
				* Rückgabe: *JSON*
		* **Geschützt:**
			* **Token-Übergabe durch Header-Key "x-access-token"**
			* /account **(Noch nicht implementiert)**
				* Rückgabe: JSON
			* /purchases
				* Rückgabe: JSON
			* /adresses
				* Rückgabe: JSON
			* /paymethods
				* Rückgabe: JSON
			* /pdf/[bestellungs_id] z.B. "/pdf/13374204242" **(Noch nicht implementiert)**
				* Parameter durch URL (Siehe Beispiel)
				* Rückgabe: PDF-Datei
	* **POST**
		* /login
			* Parameter: *username, email, pass* **User oder Email UND Passwort werden benötigt!**
			* Rückgabe: JSON **(Enthält TOKEN)**
		* /register

			* Parameter: *username, email, first_name, last_name, pass, pass_repeat*
			* Rückgabe: JSON

