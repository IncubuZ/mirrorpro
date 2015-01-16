//localStorage.serviceURL = "http://situationreport.meximas.com/services/";
var serviceURL = localStorage.serviceURL;
$(document).ready(function() {
	FastClick.attach(document.body);
	console.log("FastClickReady");
	loadingShow("#firstPage");
	document.addEventListener("deviceready", deviceReady, true);
	$("#loginPage").on("pagecreate", loginBindEvent);
	$("#regisPage").on("pagecreate", regisBindEvent);
	//$("#profilePage").on("pagecreate", getUserDetail);
	$("#editProfilePage").on("pagecreate", editUserBindEvent);
	
	
});

function checkPreAuth() {
	console.log("checkPreAuth");
	if (window.localStorage.username !== undefined && window.localStorage.password !== undefined) {
		$.mobile.changePage("#homePage");
		loadingHide();
		navigator.splashscreen.hide();
	} else {
		$.mobile.changePage("#loginRegisPage");
		loadingHide();
		navigator.splashscreen.hide();
	}
}

function loadingShow(desti) {
	$.mobile.loading('show');
	$(desti).hide();
}

function loadingHide(desti) {
	$.mobile.loading('hide');
	$(desti).show();
}
function onBackbutton(e){
	if ($.mobile.activePage.is('#loginRegisPage')) {
			e.preventDefault();
			navigator.app.exitApp();
		} 
		else if($.mobile.activePage.is('#homePage')){
           e.preventDefault();
		   navigator.home.home(function(){console.info("Successfully launched home intent");}, 
			   				   function(){console.error("Error launching home intent");});
       }
       else {
           navigator.app.backHistory()
       }
	
	}
function deviceReady() {
	checkPreAuth();
	document.addEventListener("backbutton", onBackbutton, false);
	 console.log("navigator.geolocation works well");
}