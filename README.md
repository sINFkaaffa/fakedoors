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
		* / **Statisches Verzeichnis (index.html)**
		* /products/[seite] z.B. "/products/2" ("Öffentllich")
			* Parameter durch URL (Siehe Beispiel)
			* Rückgabe: *JSON*
		* /account **(Noch nicht implementiert)**
			* Parameter durch Session
			* Rückgabe: *Authentifizierungsfehler* oder *JSON mit Accountdaten*
		* /purchases **(Noch nicht implementiert)**
		 	* Parameter durch Session
			* Rückgabe: *Authentifizierungsfehler* oder *JSON mit Bestellungen*
		* /adresses **(Noch nicht implementiert)**
			* Parameter durch Session
			* Rückgabe: *Authentifizierungsfehler* oder *JSON mit Adressen*
		* /paymethods **(Noch nicht implementiert)**
			* Parameter durch Session
			* Rückgabe: *Authentifizierungsfehler* oder *JSON mit Zahlungsmethoden*
		* /pdf/[bestellungs_id] z.B. "/pdf/13374204242" **(Noch nicht implementiert)**
			* Parameter durch URL (Siehe Beispiel) und Session
			* Rückgabe: *PDF-Datei der Bestellung*
	* **POST**
		* /login
			* Parameter: *user, email, pass* **User oder Email UND Passwort werden benötigt!**
			* Rückgabe: *Fehler* oder *"Success" String*
		* /register
			* Parameter: *user, email, first_name, last_name, pass, pass_repeat*
			* Rückgabe: *Fehler* oder *"Success" String*
