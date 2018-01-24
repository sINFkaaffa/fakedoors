import unorm from '../js/unorm';
import sjcl from '../js/sjcl';

export default {
	pbkpdf2: function(pwPlainText, user) {
		pwPlainText = unorm.nfc(pwPlainText);

		user = unorm.nfc(user.trim()).toLowerCase();
		var salt = sjcl.codec.utf8String.toBits('fakedoors.com' + user); // Determenistic unique salt

		// PBKDF2 computation, result returned as hexadecimal encoding
		var key = sjcl.misc.pbkdf2(pwPlainText, salt, 1000, 32 * 8, function(key) {
			var hasher = new sjcl.misc.hmac(key, sjcl.hash.sha256);
			this.encrypt = function() {
				return hasher.encrypt.apply(hasher, arguments);
			};
		});

		return sjcl.codec.hex.fromBits(key);
	}
}
