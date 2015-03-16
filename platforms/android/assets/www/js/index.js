//localStorage.serviceURL = "http://situationreport.meximas.com/services/";
var serviceURL = localStorage.serviceURL;

$(document).ready(function() {
	/*document.addEventListener("offline", function(){ 
	navigator.notification.confirm('ไม่พบการเชื่อมต่อเครือข่าย ออกจากแอพฯใช่หรือไม่?', connectErrorCallback,'Error','ไม่,ใช่');
	//alert("You're offline") 
	
	}, false);*/
	
	FastClick.attach(document.body);
	
	loadingShow("#firstPage");
	document.addEventListener("deviceready", deviceReady, true);
	mainMenuSet();
	userFooterSet();
	getCurrentPosition();
	
	//$('.spNotify').text(notifyCount);
	$("#loginPage").on("pagecreate", loginBindEvent);
	$("#regisPage").on("pagecreate", regisBindEvent);
	//$("#profilePage").on("pagecreate", getUserDetail);
	$("#editProfilePage").on("pagecreate", editUserBindEvent);
	$("#addReportPage").on("pagecreate", addReportBindEvent);
	$("#editReportPage").on("pagecreate", editReportBindEvent);
	$("#createGroupPage").on("pagecreate", createGroupBindEvent);
	$("#homePage").on("pagecreate", function (){
		checkGroup();
		loadFeed();
		countNotifyGet();
		});
	$(".spNotify").on("click", function(){
		//alert("0");
		//localStorage.notifyCount=0;
		countNotifyReset();
		$.mobile.changePage("#groupPage");
		loadUserGroup();
		});
		
	
	
});
function connectErrorCallback(button) {
        if (button == 2) {
            navigator.app.exitApp();
		}
	}
function loadFeedCallback(button) {
        if (button == 2) {
            loadFeed();
		}
	}
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
	checkConnection();
	cordova.exec(null, null, "SplashScreen", "hide", []); 
	 clearCache();
	checkPreAuth();
	document.addEventListener("backbutton", onBackbutton, false);
	 console.log("deviceReady");
	 regisThisDevice();
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
	
	
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
	if(states[networkState]=='No network connection'){
	navigator.notification.confirm('ไม่พบการเชื่อมต่อเครือข่าย ออกจากแอพฯใช่หรือไม่?', connectErrorCallback,'Error','ไม่,ใช่');	
		}
	console.log(states[networkState]);
    //alert('Connection type: ' + states[networkState]);
}

function countNotify(){
    str_count = localStorage.getItem("notifyCount");
    //get a numeric value from str_count, put it in count
    if (str_count == null || str_count == "null"){
      count = 0;
    } else {
      count = parseInt(str_count);
    } // end if

    count++;

    localStorage.setItem("notifyCount", count);
	notifyCount = window.localStorage.getItem("notifyCount");
	
	$('.spNotify').text(notifyCount).fadeOut(100).css("color", "#F90").fadeIn(100);
  } // end count
  
  function countNotifyReset(){
   		localStorage.setItem("notifyCount", 0);
		notifyCount = window.localStorage.getItem("notifyCount");
		$('.spNotify').text(notifyCount).css("color", '');
  } 
  function countNotifyGet(){
	  if(parseInt(notifyCount) === 0 || notifyCount === null ||notifyCount === "null"){
		localStorage.setItem("notifyCount", 0);
		notifyCount = window.localStorage.getItem("notifyCount");
		$('.spNotify').text(notifyCount).css("color", '');
  		}else{
			$('.spNotify').text(notifyCount).css("color", 'yellow');
			} 
  }
    function mainMenuSet(){
	var manMenuHtml = '<ul data-role="listview">'
						+'<li data-icon="delete"><a data-rel="close" href="#">ปิดเมนู</a></li>'
						+'<li data-icon="recycle"><a data-rel="close" href="#homePage" onclick="loadFeed();">แสดงรายงาน ทั้งหมด</a></li>'
						+'<li data-icon="bars"><a data-rel="close" href="#userReportPage" onclick="loadThisUserReport();">รายงานสถานการณ์ของฉัน</a></li>'
						+'<li data-icon="bullets"><a data-rel="close" href="#groupPage" onclick="loadUserGroup();">แสดงรายงานและจัดการกลุ่ม</a></li>'
						+'<li data-icon="user"><a data-rel="close" href="#profilePage" onclick="getUserDetail();">โปรไฟล์</a></li>'
						+'<li data-icon="plus"><a data-rel="close" class="disGroupBtn" href="#addReportPage" onclick="getCurrentPosition();">เพิ่มรายงาน สถานการณ์</a></li>'
						+'<li data-icon="search"><a data-rel="close" href="#searchPage" onclick="clearSearchFilter();">ค้นหารายงาน สถานการณ์</a></li>'
						+'<li data-icon="lock"><a href="#" onclick="logOut();">ออกจากระบบ</a></li>'
						+'<li data-icon="power"><a href="#" onclick="exitApp();">ออกจากแอพ</a></li>'
					 +'</ul>';
		$('.mainMenu').html(manMenuHtml);	
	}