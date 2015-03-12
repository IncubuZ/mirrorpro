//localStorage.serviceURL = "http://situationreport.meximas.com/services/";
var serviceURL = localStorage.serviceURL;

$(document).ready(function() {
	FastClick.attach(document.body);
	
	loadingShow("#firstPage");
	document.addEventListener("deviceready", deviceReady, true);
	
	$("#loginPage").on("pagecreate", loginBindEvent);
	$("#regisPage").on("pagecreate", regisBindEvent);
	//$("#profilePage").on("pagecreate", getUserDetail);
	$("#editProfilePage").on("pagecreate", editUserBindEvent);
	$("#addReportPage").on("pagecreate", addReportBindEvent);
	$("#editReportPage").on("pagecreate", editReportBindEvent);
	$("#createGroupPage").on("pagecreate", createGroupBindEvent);
	$("#homePage").on("pagecreate", function (){checkGroup();loadFeed();});
	
	
	
});
$("#mapPage").on( "pageshow", function( event, data ){
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
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
           navigator.app.backHistory();
       }
	
	}
function exitApp(){
	clearCache();//
	navigator.app.exitApp();
	}
function deviceReady() {
	cordova.exec(null, null, "SplashScreen", "hide", []); 
	 clearCache();
	checkPreAuth();
	document.addEventListener("backbutton", onBackbutton, false);
	 console.log("deviceReady");
}
function clearCache(){
	var success = function(status) {
            //alert('Message: ' + status);
			console.log('Message: ' + status);
        }

        var error = function(status) {
            //alert('Error: ' + status);
			console.log('Error: ' + status);
        }

        window.cache.clear( success, error );
	
	
	}
	
function checkGroup(){
	
	/*if (window.localStorage.userBdate==='0000-00-00'){
	console.log(window.localStorage.userGroup);
	}*/
	if (window.localStorage.userGroup==='000000'){
		$('.disGroupBtn').addClass("ui-state-disabled");
		//$('#groupAlert').popup( "open" );
		
    		if (checkNoGroupAlert() !== true){
        		  
				/*$('#groupAlert').popup({positionTo: "origin"});
				$('#groupAlert').popup("open");*/  
				$.mobile.changePage("#groupAlertPage");  
        		//window.localStorage.setItem("firstlaunch", "0");
    		}
			
			
			
	console.log(window.localStorage.userGroup);
	
	}else{
		$('.disGroupBtn').removeClass("ui-state-disabled");
		}

}

	
	
/*$(document).on("pageshow", "#homePage", function(){
    //alert(IsFirstLaunch());
	
	
	
});*/
function setNoGroupAlert(){
	window.localStorage.setItem("noGroupAlert", "0");
	}

	
function IsFirstLaunch(){
    var fl = window.localStorage.getItem("firstlaunch");
    if (fl && parseInt(fl) == 0){
        return false;
    } else {        
        window.localStorage.setItem("firstlaunch", "0");
        return true;
    }
}
function checkNoGroupAlert(){
    			var fl = window.localStorage.getItem("noGroupAlert");
    			if (fl && parseInt(fl) === 0){
        				return true;
    				} else {        
        				//window.localStorage.setItem("firstlaunch", "0");
        				return false;
    		}
	}
function testVar(){
	console.log(localStorage.userGroup);
	}