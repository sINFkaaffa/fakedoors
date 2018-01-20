// module.exports = class Authorize {
// 	constructor(dbHandler, token) {
// 		// Not logged in/abuse prevention
// 		if(!token || typeof token !== 'object' || token.length < 1 || !token.id) {
// 			token = {};
// 			token.id = -1; // Guest
// 		}
// 		this._db = dbHandler;
// 		this.token = token;
// 	}
//
// 	member() {
// 		return new Promise(
// 			function (resolve, reject) {
// 				var token = this.token;
// 				this._db.getUserById(token.id, function(data) {
// 					if(!data.length) reject("User not found");
// 					else {
// 						data.id = token.id;
// 						resolve(data);
// 					}
// 				});
// 			}
// 		);
// 	}
// }
