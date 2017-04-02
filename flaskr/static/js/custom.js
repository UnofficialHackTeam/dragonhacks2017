var pos = {
  lat: 0,
  lng: 0
};

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 17,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
  var marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'Hello World!'
        });
  var infoWindow = new google.maps.InfoWindow({
    map: map
  });  

  infoWindow.close();
  
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    
    navigator.geolocation.getCurrentPosition(function (position) {
      
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);      
      map.setCenter(pos);

      console.log(pos);
      marker.setPosition(pos);
      
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}