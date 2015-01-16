var globalImageURI;
function getCurrentPosition() {
    var option = {
        enableHighAccuracy: true,
        timeout: 60 * 1000,
        maximumAge: 1000 * 60 * 10
    };
	
    function onSuccess(pos) {
        console.log('geoSuccess');
        var text = "<div>Latitude: " + pos.coords.latitude + "<br/>" +
            "Longitude: " + pos.coords.longitude + "<br/>" +
            "Accuracy: " + pos.coords.accuracy + "m<br/>" + "</div>";
        $("#cur_position").html(text);
        console.log(text);
        var mapwidth = parseInt($('#map').css("width"), 10); // remove 'px' from width value
        var mapheight = parseInt($('#map').css("height"), 10);
        $('#map').attr('src',
            "http://maps.googleapis.com/maps/api/staticmap?center=" +
            pos.coords.latitude + "," + pos.coords.longitude +
            "&zoom=13&size=" + mapwidth + "x" + mapheight +
            "&maptype=roadmap&markers=color:green%7C" + pos.coords.latitude +
            "," + pos.coords.longitude + "&sensor=false");
        $('#map').css('visibility', 'visible');
    }

    function onError(errMsg) {
        console.log('geoError');
        alert(JSON.stringify(errMsg))
        $("#cur_position").html("Error getting geolocation: " + error.code);
        console.log("Error getting geolocation: code=" + error.code +
            " message=" + error.message);
    }
	$('#cameraImage').css('visibility', 'hidden');
	$('#map').css('visibility','hidden');
    $("#cur_position").html("Getting geolocation . . .");
    navigator.geolocation.getCurrentPosition(onSuccess, onError, option);
	console.log("Getting geolocation . . .");
}

//camera
function onPhotoDataSuccess(imageURI) {
        var image = document.getElementById('cameraImage');
        image.src = imageURI;
        $('#cameraImage').css('visibility', 'visible');
    }
    //function onPhotoURISuccess(imageURI) {
    //var image = document.getElementById('cameraImage');
    //  image.src = imageURI;
    //}

function onPhotoURISuccess(imageURI) {
        var image = document.getElementById('cameraImage');
        image.src = imageURI;
        $('#cameraImage').css('visibility', 'visible');
		globalImageURI = imageURI;
		console.log(globalImageURI);
    }
    //function take_pic() {
    //    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 100, //destinationType: Camera.DestinationType.DATA_URL, targetWidth:320, //targetHeight:320, correctOrientation:1, saveToPhotoAlbum:1, allowEdit:1});
    //}
function testGlobalURI(){
	
	console.log(globalImageURI);
	}
function take_pic() {
	
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        targetWidth: 320,
        targetHeight: 320,
        correctOrientation: 1,
        saveToPhotoAlbum: 1,
        allowEdit: 1
    });
}

function album_pic() {
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