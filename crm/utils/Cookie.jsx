export const Cookie = {
	setCookie: function (cname, cvalue, exmins = 15) {
		var d = new Date();
		d.setTime(d.getTime() + (exmins * 60 * 1000));
		var expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	},
	getCookie: function (cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var cookiesList = decodedCookie.split(';');
		for (var i = 0; i < cookiesList.length; i++) {
			var c = cookiesList[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return true
			}
		}
		return false;
	}
}
export default Cookie;