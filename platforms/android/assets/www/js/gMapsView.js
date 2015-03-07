
var refreshIntervalId = 0;
function showMap() {
    var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
			refreshIntervalId = setInterval(function () { drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)); }, 300);
            
        }
        function fail(error) {
			refreshIntervalId = setInterval(function () { drawMap(defaultLatLng); }, 300);
            // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
			refreshIntervalId = setInterval(function () { drawMap(defaultLatLng); }, 300);
    }
    function drawMap(latlng) {
		clearInterval(refreshIntervalId);
        var myOptions = {
            zoom: 10,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Greetings!"
        });
    }
}

function showThisMap(thisLat, thisLong) {
    
	   // var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
	clearCache();//
		var thisLatLng = new google.maps.LatLng(thisLat, thisLong);
		refreshIntervalId = setInterval(function () { drawMap(thisLatLng); }, 1000);
	
	function drawMap(latlng) {
		if (refreshIntervalId != 0) {
    		clearInterval(refreshIntervalId);
			}
			refreshIntervalId = 0;
	
        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Greetings!"
        });
    }
}


	