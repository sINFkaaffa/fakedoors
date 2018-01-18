/**
 * Dependencies
 */
var bcrypt 	= require('bcrypt');
var jwt 	= require('jsonwebtoken');

/**
 * Configuration
 */
const securityCfg = require('../cfg/security');

/**
 * Security model
 */
module.exports = {
	//========================
	// Hash password
	//========================
	hashPassword: function(password, callback) {
		bcrypt.hash(password, securityCfg.passwordSaltRounds, function (err, hash) {
			if (err) throw err;
			callback(hash);
		});
	},

	//========================
	// Compare password
	//========================
	comparePassword: function(password, compare, callback) {
		bcrypt.compare(password, compare, function(err, res) {
			callback(!err && res);
		});
	},

	//========================
	// Create token
	//========================
	createToken: function(userId) {
		return jwt.sign({
			id: userId
		} /*Payload*/, securityCfg.token.secret, {
			expiresIn: securityCfg.token.expiresIn
		} /*Options*/);
	},


	//========================
	// Verify token
	//========================
	verifyToken: function(token, callback) {
		jwt.verify(token, securityCfg.token.secret, function(err, decoded) {
			if (err) return callback(err);
			return callback(null, decoded);
		});
	}
}
