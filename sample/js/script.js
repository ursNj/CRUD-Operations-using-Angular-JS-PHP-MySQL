function validateEmail(userEmail) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(userEmail);
}

function updateUserLang() {
	var lang = $("#selectedLang").val();
	console.log(lang);
	setCookie("userLang", lang, 30);
	location.reload();
}

function userLogout() {
	setCookie("userEmail", "", -1);
	setCookie("access_token", "", -1);
	setCookie("userName", "", -1);
}

function checkLang() {
    var userLang = getCookie("userLang");
    if (userLang != "") {
		console.log("cookie Lang: " + userLang);
    } else {
		var userLang = navigator.language || navigator.userLanguage;
		console.log("browser Lang: " + userLang);
		if(userLang == 'en-GB' ) {
			userLang = 'en-US';
		}
       if (userLang != "" && userLang != null) {
           setCookie("userLang", userLang, 30);
       } else {
           setCookie("userLang", "en-US", 30);
	   }
    }
}

checkLang();

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
