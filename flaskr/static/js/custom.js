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

  var user_points = [
    {lat: 39.954964, lng: -75.182501},
    {lat: 39.95484, lng: -75.181981},
    {lat: 39.956267, lng: -75.182962},
    {lat: 39.955576, lng: -75.181117}
  ];




  plot_points = function(points_list){
    for(var i = 0; i<points_list.length; i++){
      console.log(user_points[i]);
      marker = new google.maps.Marker({
              position: user_points[i],
              map: map,
              title: 'Hello World!'
            });

      }
    }
  plot_points(user_points);
  }








function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}