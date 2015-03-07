var globalAddReportImageURI = null;
var globalLatitude = null;
var globalLongitude = null;
var globalAccuracy = null;
var globalDateTime = null;
var globalLocat = null;
var titleState = false;
var contentState = false;
function getCurrentPosition() {
		
		globalAddReportImageURI = null;
		globalLatitude = null;
		globalLongitude = null;
		globalAccuracy = null;
		var d = moment();
		$('#imgMiniPropic').attr('src', serviceURL + "../img/userprofileimage/" +
		localStorage.userImageUrl + "?" + d.format());
		validReport();
		var option = {
			enableHighAccuracy: true,
			timeout: 60 * 1000,
			maximumAge: 1000 * 60 * 10
		};

		function onSuccess(pos) {
			console.log('geoSuccess');
			globalLatitude = pos.coords.latitude;
			globalLongitude = pos.coords.longitude;
			globalAccuracy = pos.coords.accuracy;
			var text = "<div>Latitude: " + pos.coords.latitude + "<br/>" +
				"Longitude: " + pos.coords.longitude + "<br/>" + "Accuracy: " + pos.coords
				.accuracy + "m<br/>" + "</div>";
			$("#cur_position").html(text);
			console.log(text);
			var mapwidth = parseInt($('#map').css("width"), 10); // remove 'px' from width value
			var mapheight = parseInt($('#map').css("height"), 10);
			$('#map').attr('src',
				"http://maps.googleapis.com/maps/api/staticmap?center=" + pos.coords.latitude +
				"," + pos.coords.longitude + "&zoom=16&size=400x400&maptype=roadmap&markers=color:green%7C" + pos.coords.latitude +
				"," + pos.coords.longitude + "&sensor=false");
				//" + mapwidth + "x" + mapheight + "
			$('#map').css('visibility', 'visible');
			$.ajax({
				url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + pos.coords
					.latitude + ',' + pos.coords.longitude + '&sensor=true&language=th',
				success: function(data) {
					globalLocat = data.results[0].address_components[0].short_name +
						" " + data.results[0].address_components[1].short_name + " " + data.results[
							0].address_components[2].short_name + " " + data.results[0].address_components[
							3].short_name;
					$('#spMiniLocat').text(globalLocat);
					/*or you could iterate the components for only the city and state*/
				}
			});
		}

		function onError(errMsg) {
			console.log('geoError');
			alert(JSON.stringify(errMsg));
			$("#cur_position").html("Error getting geolocation: " + error.code);
			console.log("Error getting geolocation: code=" + error.code + " message=" +
				error.message);
		}
		$('#cameraImage').css('visibility', 'hidden');
		$('#map').css('visibility', 'hidden');
		$("#cur_position").html("Getting geolocation . . .");
		navigator.geolocation.getCurrentPosition(onSuccess, onError, option);
		console.log("Getting geolocation . . .");
	}
	//camera


	//function onPhotoURISuccess(imageURI) {
	//var image = document.getElementById('cameraImage');
	//  image.src = imageURI;
	//}

function onPhotoURISuccess(imageURI) {
		var image = document.getElementById('cameraImage');
		image.src = imageURI;
		$('#cameraImage').css('visibility', 'visible');
		globalAddReportImageURI = imageURI;
		console.log(globalAddReportImageURI);
		validReport();
	}
	//function take_pic() {
	//    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 100, //destinationType: Camera.DestinationType.DATA_URL, targetWidth:320, //targetHeight:320, correctOrientation:1, saveToPhotoAlbum:1, allowEdit:1});
	//}

function testGlobalURI() {
	console.log(globalAddReportImageURI);
}

function take_pic() {
	navigator.camera.getPicture(onPhotoURISuccess, onFail, {
		quality: 100,
		destinationType: Camera.DestinationType.FILE_URI,
		sourceType: Camera.PictureSourceType.CAMERA,
		targetWidth: 320,
		targetHeight: 320,
		correctOrientation: 1,
		saveToPhotoAlbum: 1,
		allowEdit: 1
	});
}

function album_pic() {
	clearCache();
	navigator.camera.getPicture(onPhotoURISuccess, onFail, {
		quality: 100,
		destinationType: Camera.DestinationType.FILE_URI,
		sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
		targetWidth: 320,
		targetHeight: 320,
		correctOrientation: 1,
		saveToPhotoAlbum: 1,
		allowEdit: 1
	});
}

function onFail(message) {
		alert('Failed because: ' + message);
	}
	//////////////////////////////////////////

function addReportBindEvent() {
		var d = moment();
		$("#reportTitleInput").on('focusout', function() {
			if ($("#reportTitleInput").val()) {
				titleState = true;
				validReport();
			} else {
				titleState = false;
				validReport();
			}
		}).on('keyup', function() {
			if ($("#reportTitleInput").val()) {
				titleState = true;
				validReport();
			} else {
				titleState = false;
				validReport();
			}
		});
	$("#reportContentInput").on('keyup', function() {
			if ($("#reportContentInput").val()) {
				contentState = true;
				validReport();
			} else {
				contentState = false;
				validReport();
			}
		}).on('focusout', function() {
			if ($("#reportContentInput").val()) {
				contentState = true;
				validReport();
			} else {
				contentState = false;
				validReport();
			}
		});
		$('#imgMiniPropic').attr('src', serviceURL + "../img/userprofileimage/" +
			localStorage.userImageUrl + "?" + d.format());
		$('#spNameMiniPro').text(localStorage.userRName + ' ' + localStorage.userSurname);
		$('#spMiniLocat').text();
		$('#spDateMini').text(d.format('DD MMMM YYYY'));
		//$("#addRepSumitBtn").on("click", handleAddreport);
		
		startTime();
		console.log(globalAddReportImageURI);
		validReport();
		
		//getCurrentPosition();
		//$('#spTimeMini').text(d.format('[เวลา] h:mm:ss'));
		// มกราคม 18 2015, 8:47:51 หลังเที่ยงmoment(localStorage.userBdate, 'YYYY-MM-DD', 'th').format('LL')
	}
	///////////////////////////////

function startTime() {
		var d = moment();
		$('#spTimeMini').text(d.format('HH:mm:ss'));
		var t = setTimeout(function() {
			startTime()
		}, 500);
	}
//////////////////////////////////////////////////////////////////////////////
function validReport() {
	if (globalAddReportImageURI !== null&&globalLatitude !== null&&globalLongitude !== null&&globalAccuracy !== null&&globalLocat !== null&&titleState !== false&&contentState !== false) {
		$("#addRepSumitBtn").removeClass("ui-state-disabled");
		return true;
	} else {
		$("#addRepSumitBtn").addClass("ui-state-disabled");
		return false;
	}
}
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////	  
//function handleAddreport(){
	//$("#popupSelectWith").hide();
//	window.history.back();
	//globalProfileImageURI = imageURI;
	//$('#imgEditPropic').attr('src', globalProfileImageURI);
	
	//var image = document.getElementById('imgEditPropic');
      //  image.src = imageURI;
        //$('#cameraImage').css('visibility', 'visible');
		//globalAddReportImageURI = imageURI;
		//console.log(globalProfileImageURI);
		//uploadPhotoProfileData(globalProfileImageURI);
	
//	}
function handleAddreport() {
			loadingShow("#contentAddReport");
		  var dEvent = moment().format('YYYY-MM-DD HH:mm:ss');
		  
		  
          var options = new FileUploadOptions();
          options.fileKey="file";
          options.fileName=globalAddReportImageURI.substr(globalAddReportImageURI.lastIndexOf('/')+1);
          options.mimeType="image/jpeg";
////
          var params = new Object();
          params.userId = localStorage.userId;
		  params.dateEvent = dEvent;
		  params.title = $("#reportTitleInput").val();
		  params.content =$("#reportContentInput").val();
		  params.latitude = globalLatitude;
		  params.longitude = globalLongitude;
		  params.locat = globalLocat;
		  console.log(options);
          //params.value2 = "param";
////
          options.params = params;
          options.chunkedMode = false;

          var ft = new FileTransfer();
          ft.upload(globalAddReportImageURI, encodeURI(serviceURL + "addReport.php"), win, fail, options);
		  
      }
//////////////////////////////////////////////////////
function win(r) {
          console.log("Code = " + r.responseCode.toString()+"\n");
          console.log("Response = " + r.response.toString()+"\n");
          console.log("Sent = " + r.bytesSent.toString()+"\n");
		  
          alert("เพิ่มรายงานเรียบร้อยแล้ว!");
		  //$('#imgPropic').attr('src', globalProfileImageURI);
		  //getUserDetail();
		  loadFeed();
		  window.history.back();
		 loadingHide("#contentAddReport");
		   
		   //$.mobile.changePage("#homePage");
		  
		  //$.mobile.changePage("#profilePage", { changeHash: false });
		  //$.mobile.changePage( "../resources/us.html", { transition: "slideup", changeHash: false });
      }

function fail(error) {
	
		 loadingHide("#contentAddReport");
          alert("An error has occurred: Code = " + error.code);
		  
      }
//////////////////////////////////////////////////////	 

	/*
var getCurrentPosition = function() {
	
    var onSuccess = function(pos) {                
        var text = "<div>Latitude: " + pos.coords.latitude + 
                    "<br/>" + "Longitude: " + pos.coords.longitude + "<br/>" + 
                    "Accuracy: " + pos.coords.accuracy + "m<br/>" + "</div>";
        $("#cur_position").html(text);
        console.log(text);
        
        var mapwidth = parseInt($('#map').css("width"), 10);  // remove 'px' from width value
        var mapheight = parseInt($('#map').css("height"), 10);
        
        $('#map').attr('src', "http://maps.googleapis.com/maps/api/staticmap?center=" + 
            pos.coords.latitude + "," + pos.coords.longitude + 
            "&zoom=13&size=" + mapwidth + "x" + mapheight + "&maptype=roadmap&markers=color:green%7C" +
            pos.coords.latitude + "," + pos.coords.longitude + "&sensor=false");
		$('#map').css('visibility','visible');
    };
    var onError = function(error) {
        $("#cur_position").html("Error getting geolocation: " + error.code);
        console.log("Error getting geolocation: code=" + error.code + " message=" + error.message);
    };
	 $('#map').css('visibility','hidden');
    $("#cur_position").html("Getting geolocation . . .");
   
	var onSuccess = function(position) {};
	
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true , timeout: 10*1000 , maximumAge: 6000 });
 console.log("Getting geolocation . . .");
};
*/