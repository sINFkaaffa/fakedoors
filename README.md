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
* **MySQL Zugangsdaten:** Host='localhost' User='root' Passwort='' *Datenbank wird automatisch erstellt!* **Siehe Server/app/cfg/mysql.js**

* **Abhängigkeiten installieren:**
	* ``` npm install -g nodemon ```
	* ``` cd Server && npm install```

* **Starten:**
	* ``` cd Server && nodemon npm start``` (_Port 3000_)

* **Requests:**
	* **GET**
		* /products/[seite] z.B. "/products/2" ("Öffentllich")
		* /purchases/[username] z.B. "/purchases/alex" (Nur für authentifizierte Benutzer)
	* **POST**
		* /login
			* Parameter: *user, email, pass*
		* /register
			* Parameter: *user, email, first_name, last_name, pass, pass_repeat*
