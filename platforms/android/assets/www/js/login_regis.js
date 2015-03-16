var serviceURL = localStorage.serviceURL;
var userState = false;
var passState = false;
var emailState = false;
var realNameState = false;
var realSNameState = false;
var bDateState = false;
var userMsgD = " สามารถใช้อักษร a-z,0-9,_,- ความยาว 4-15 ตัว ";
var passMsgD = " สามารถใช้อักษร a-Z,0-9,_,- ความยาว 5-15 ตัว ";
//////////////////////////////////////////////////////////////////////////////
function loginBindEvent() {
	$("#loginForm").on("submit", handleLogin);
	console.log("handleLogin run");
}
//////////////////////////////////////////////////////////////////////////////
function regisBindEvent() {
	$('#regisBDate').combodate({
        value: moment(localStorage.userBdate, 'YYYY-MM-DD'),
		template:'DD MMMM YYYY',
        minYear: 1900,
        maxYear: moment().format('YYYY')
    	}); 
	validAll();
	$("#userInputRegis").on('focusout', checkUsedName).on('focusin', function() {
		$("#pMsgU").text(userMsgD).css("color", "black");
	});
	$("#passInputRegis").on('focusout', checkPass).on('focusout', checkUsedName).on('focusin',
		function() {
			$("#pMsgP").text(passMsgD).css("color", "black");
		});
	$("#repassInputRegis").on('focusout', recheckPass);
	$("#emailInputRegis").on('focusout', checkEmail);
	$("#nameInput").on('focusout', function() {
		if ($("#nameInput").val()) {
			realNameState = true;
			validAll();
		} else {
			realNameState = false;
			validAll();
		}
	});
	$("#surnameInput").on('focusout', function() {
		if ($("#surnameInput").val()) {
			realSNameState = true;
			validAll();
		} else {
			realSNameState = false;
			validAll();
		}
	});
	$("#regisBDate").on('change', function() {
		if ($("#regisBDate").val()) {
			bDateState = true;
			validAll();
		} else {
			bDateState = false;
			validAll();
		}
	});
	
	$("#sumitBtn").on("click", handleRegis);
}
//////////////////////////////////////////////////////////////////////////////
function handleLogin() {
	var form = $("#loginForm");
	var url = serviceURL + 'handle_login.php'; // you'll want to change
	//disable the button so we can't resubmit while we wait
	loadingShow("#contentLogin");
	$("#submitButton", form).attr("disabled", "disabled");
	var u = $("#username", form).val();
	var p = $("#password", form).val();
	if (u !== '' && p !== '') {
		$.ajax({
			type: 'GET',
			url: url,
			contentType: "application/json",
			dataType: 'jsonp',
			data: {
				username: u,
				password: p
			},
			crossDomain: true,
			timeout: 10000,
			success: function(res) {
				//var user = res.item;
				console.log(res);
				console.log(!jQuery.isEmptyObject(res));
				if (!jQuery.isEmptyObject(res)) {
					//store
					console.log(res.user_id);
					window.localStorage.username = u;
					window.localStorage.password = p;
					window.localStorage.userId = res.user_id;
					window.localStorage.userRName = res.user_rname;
					window.localStorage.userSurname = res.user_surname;
					window.localStorage.userEmail = res.user_email;
					window.localStorage.userBdate = res.user_bdate;
					window.localStorage.userGender = res.user_gender;
					window.localStorage.userImageUrl = res.user_imageUrl;
					window.localStorage.userStatus = res.user_status;
					window.localStorage.userGroup = res.user_group;
					userFooterSet();
					console.log(res.user_group);
					regisThisDevice();
					//window.localStorage.userId = res.user_id;
					//window.location.replace(some.html);
					//window.open("home.html", '_self');
					 $(form)[0].reset();
					$.mobile.changePage("#homePage");
					checkGroup();
					loadFeed();
				} else {
					navigator.notification.alert("Your login failed", function() {});
				}
			
				$("#submitButton").removeAttr("disabled");
				loadingHide("#contentLogin");
			},
			error: function(e) {
				console.log(e.message);
				navigator.notification.alert("ERROR กรุณาตรวจสอบการเชื่อมต่อ อินเตอร์เน็ต ");
				loadingHide("#contentLogin");
			},
			complete: function(e) {
				console.log("message");
				$("#submitButton").removeAttr("disabled");
				loadingHide("#contentLogin");
			}
		});
	} else {
		navigator.notification.alert("You must enter a username and password", function() {});
		
		$("#submitButton").removeAttr("disabled");
		loadingHide("#contentLogin");
	}
	return false;
}
//////////////////////////////////////////////////////////////////////////////
function handleRegis() {
	var form = $("#regisForm");
	var url = serviceURL + 'regisUser.php';
	$("#sumitBtn").addClass("ui-state-disabled");
	var u = $("#userInputRegis", form).val();
	var p = $("#passInputRegis", form).val();
	var e = $("#emailInputRegis", form).val();
	var rn = $("#nameInput", form).val();
	var rsn = $("#surnameInput", form).val();
	var g = $("#genderSelect", form).val();
	var bd = moment($('#regisBDate').val(), "DD-MM-YYYY").format('YYYY-MM-DD');
	console.log(bd);
	loadingShow("#contentRegis");
	if (validAll()) {
		$.ajax({
			type: 'GET',
			url: url,
			contentType: "application/json",
			dataType: 'jsonp',
			data: {
				username: u,
				password: p,
				email: e,
				realname: rn,
				realsname: rsn,
				gender: g,
				bday: bd
			},
			crossDomain: true,
			timeout: 10000,
			success: function(res) {
				if (!jQuery.isEmptyObject(res)) {
					console.log(res.user_id);
					window.localStorage.username = u;
					window.localStorage.password = p;
					window.localStorage.userId = res.user_id;
					window.localStorage.userRName = res.user_rname;
					window.localStorage.userSurname = res.user_surname;
					window.localStorage.userEmail = res.user_email;
					window.localStorage.userBdate = res.user_bdate;
					window.localStorage.userGender = res.user_gender;
					window.localStorage.userImageUrl = res.user_imageUrl;
					window.localStorage.userStatus = res.user_status;
					window.localStorage.userGroup = res.user_group;
					userFooterSet();
					regisThisDevice();
					//window.localStorage.userId = res.user_id;
					//window.location.replace(some.html);
					//window.open("home.html", '_self');
					$(form)[0].reset();
					$("#pMsgU").text("");
					$("#pMsgP").text("");
					$("#pMsgE").text("");
					userState = false;
					passState = false;
					emailState = false;
					realNameState = false;
					realSNameState = false;
					validAll();
					$.mobile.changePage("#homePage");
					checkGroup();
					loadFeed();
				} else {
					navigator.notification.alert("Your login failed", function() {});
					
				}
				
				$("#sumitBtn").removeClass("ui-state-disabled");
				loadingHide("#contentRegis");
			},
			error: function(e) {
				console.log(e.message);
				navigator.notification.alert("ERROR กรุณาตรวจสอบการเชื่อมต่อ อินเตอร์เน็ต ");
				$("#sumitBtn").removeClass("ui-state-disabled");
				loadingHide("#contentRegis");
			},
			complete: function(e) {
				console.log("message");
			}
		});
	} else {
		navigator.notification.alert("You must fill form");
		$("#submitButton").removeAttr("disabled");
		loadingHide("#contentRegis");
	}
	return false;
}
//////////////////////////////////////////////////////////////////////////////
function dateNow() {
	var now = new Date();
	var day = ("0" + now.getDate()).slice(-2);
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	var today = now.getFullYear() + "-" + (month) + "-" + (day);
	$('#datePicker').val(today);
}
//////////////////////////////////////////////////////////////////////////////
function validAll() {
	if (userState === true && passState === true && emailState === true && realNameState === true &&
		realSNameState === true && bDateState === true) {
		$("#sumitBtn").removeClass("ui-state-disabled");
		return true;
	} else {
		$("#sumitBtn").addClass("ui-state-disabled");
		return false;
	}
}
//////////////////////////////////////////////////////////////////////////////
function checkUsernameRegEx(username) {
	var pattern = /^[a-z0-9_-]{4,15}$/;
	if (pattern.test(username)) {
		return true;
	} else {
		return false;
	}
}
//////////////////////////////////////////////////////////////////////////////
function checkEmailRegEx(email) {
	var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
	if (pattern.test(email)) {
		return true;
	} else {
		return false;
	}
}
//////////////////////////////////////////////////////////////////////////////
function checkPasswordRegEx(password) {
	var pattern = /^[a-zA-Z0-9_-]{5,15}$/;
	if (pattern.test(password)) {
		return true;
	} else {
		return false;
	}
}
//////////////////////////////////////////////////////////////////////////////
function checkUsedName() {
	var form = $("#regisForm");
	var u = $("#userInputRegis").val();
	
	var url = serviceURL + 'checkUsedName.php';
	if (u !== '') {
		if (checkUsernameRegEx(u) === true) {
			$.ajax({
				type: 'GET',
				url: url,
				contentType: "application/json",
				dataType: 'jsonp',
				data: {
					username: u
				},
				crossDomain: true,
				timeout: 10000,
				success: function(res) {
					if (res.success === true) {
						userState = false;
						validAll();
						$("#pMsgU").text(u + " ชื่อนี้มีผู้ใช้แล้ว").css("color", "red");
						$("#userInputRegis", form).val("");
					} else {
						userState = true;
						validAll();
						$("#pMsgU").text(u + " ชื่อนี้สามารถใช้ได้").css("color", "green");
					}
				},
				error: function(e) {
					console.log(e.message);
					userState = false;
					validAll();
					navigator.notification.alert("ERROR กรุณาตรวจสอบการเชื่อมต่อ อินเตอร์เน็ต ");
				},
				complete: function(e) {
					console.log("message");
				}
			});
		} else {
			userState = false;
			validAll();
			$("#pMsgU").text(userMsgD).css("color", "red");
		}
	} else {
		userState = false;
		validAll();
		$("#pMsgU").text("กรุณากรอก Username").css("color", "red");
	}
	return false;
}
//////////////////////////////////////////////////////////////////////////////
function checkPass() {
	var form = $("#regisForm");
	var p = $("#passInputRegis", form).val();
	if (p !== '') {
		if (checkPasswordRegEx(p) === true) {
			passState = false;
			validAll();
			$("#pMsgP").text(" กรอกรหัสอีกครั้ง ").css("color", "black");
		} else {
			passState = false;
			validAll();
			$("#pMsgP").text(passMsgD).css("color", "red");
		}
	} else {
		passState = false;
		validAll();
		$("#pMsgP").text(" กรุณากรอก Password ").css("color", "red");
	}
}
//////////////////////////////////////////////////////////////////////////////
function recheckPass() {
	var form = $("#regisForm");
	var p = $("#passInputRegis", form).val();
	var rp = $("#repassInputRegis", form).val();
	if (rp !== '') {
		if (checkPasswordRegEx(rp) === true) {
			if (p == rp) {
				passState = true;
				validAll();
				$("#pMsgP").text(" รหัสผ่านนี้สามารถใช้ได้").css("color", "green");
			} else {
				passState = false;
				validAll();
				$("#pMsgP").text(" รหัสผ่านนี้ไม่ตรงกัน").css("color", "red");
			}
		} else {
			passState = false;
			validAll();
			$("#pMsgP").text(passMsgD).css("color", "red");
		}
	} else {
		passState = false;
		validAll();
		$("#pMsgP").text(" กรุณากรอก Password อีกครั้ง").css("color", "red");
	}
}
//////////////////////////////////////////////////////////////////////////////
function checkEmail() {
	var form = $("#regisForm");
	var e = $("#emailInputRegis", form).val();
	var url = serviceURL + 'checkUsedEmail.php';
	if (e !== '') {
		if (checkEmailRegEx(e) === true) {
			$.ajax({
				type: 'GET',
				url: url,
				contentType: "application/json",
				dataType: 'jsonp',
				data: {
					email: e
				},
				crossDomain: true,
				timeout: 10000,
				success: function(res) {
					if (res.success === true) {
						emailState = false;
						validAll();
						$("#pMsgE").text(" Email นี้มีผู้ใช้แล้ว").css("color", "red");
					} else {
						emailState = true;
						validAll();
						$("#pMsgE").text(" Email นี้สามารถใช้ได้").css("color", "green");
					}
				},
				error: function(e) {
					console.log(e.message);
					emailState = false;
					validAll();
					navigator.notification.alert("ERROR กรุณาตรวจสอบการเชื่อมต่อ อินเตอร์เน็ต");
				},
				complete: function(e) {
					console.log("message");
				}
			});
		} else {
			emailState = false;
			validAll();
			$("#pMsgE").text(" กรุณากรอก Email ให้ถูกต้อง ").css("color", "red");
		}
	} else {
		emailState = false;
		validAll();
		$("#pMsgE").text("กรุณากรอก Email").css("color", "red");
	}
	return false;
}
//////////////////////////////////////////////////////////////////////////////

function logOut() {
	localStorage.removeItem("username");
	localStorage.removeItem("password");
	localStorage.removeItem("userId");
	localStorage.removeItem("userRName");
	localStorage.removeItem("userSurname");
	localStorage.removeItem("userEmail");
	localStorage.removeItem("userBdate");
	localStorage.removeItem("userGender");
	localStorage.removeItem("userImageUrl");
	localStorage.removeItem("userStatus");
	localStorage.removeItem("userGroup");
	localStorage.removeItem("noGroupAlert");
	deleteThisDevice();
	countNotifyReset();
	console.log("LogOut");
	$.mobile.changePage("#loginRegisPage");
	//window.open("login_regis.html",'_self');
}
//////////////////////////////////////////////////////////////////////////////

function userFooterSet() {
	$('.userFooter').text(window.localStorage.userRName+" "+window.localStorage.userSurname);
}
//////////////////////////////////////////////////////////////////////////////