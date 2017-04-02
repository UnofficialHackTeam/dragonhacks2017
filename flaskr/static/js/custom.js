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
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    /*var marker = new google.maps.Marker({
            position: pos,
            map: map,
          });*/
    var infoWindow = new google.maps.InfoWindow({
        map: map
    });

    infoWindow.close();

    // Try HTML5 geolocation.
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(position) {

            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            map.setCenter(pos);

            console.log(pos);
            //marker.setPosition(pos);

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    var user_points = [{
            lat: 39.954964,
            lng: -75.182501
        },
        {
            lat: 39.95484,
            lng: -75.181981
        },
        {
            lat: 39.956267,
            lng: -75.182962
        },
        {
            lat: 39.955576,
            lng: -75.181117
        }
    ];


    $('#button-group  button').on("click", function() {
        $('#submit-button').css("display", "block");
        $('#button-group button').css("display", "none");

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function(position) {

                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                map.setCenter(pos);

                console.log(pos);
                marker.setPosition(pos);

            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
            marker = new google.maps.Marker({
                position: pos,
                map: map,
                animation: google.maps.Animation.DROP,
                draggable: true
            });

            $("#submit").on("click", function() {
                var lat = marker.getPosition().lat();
                var lng = marker.getPosition().lng();
                pos.lat = lat;
                pos.lng = lng;
                marker.position = pos;
                marker.draggable = false;
                $('#longitude').val(lng);
                $('#latitude').val(lat);
                // $('#eventType').val(); NEEDS TO BE FILLED
                $('#timestamp').val(timeStamp());
            });




        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}



    /*plot_points = function(points_list){
      for(var i = 0; i<points_list.length; i++){
        console.log(user_points[i]);
        marker = new google.maps.Marker({
                position: user_points[i],
                map: map,
                title: 'Hello World!'
              });

        }
      }
    plot_points(user_points);*/


    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }



    /**
 * Return a timestamp with the format "m/d/yy h:MM:ss TT"
 * @type {Date}
 * credit to https://gist.github.com/hurjas/2660489
 */

function timeStamp() {
// Create a date object with the current time
  var now = new Date();

// Create an array with the current month, day and time
  var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

// Create an array with the current hour, minute and second
  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

// Determine AM or PM suffix based on the hour
  var suffix = ( time[0] < 12 ) ? "AM" : "PM";

// Convert hour from military time
  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

// If hour is 0, set it to 12
  time[0] = time[0] || 12;

// If seconds and minutes are less than 10, add a zero
  for ( var i = 1; i < 3; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
  }

// Return the formatted string
  return date.join("/") + " " + time.join(":") + " " + suffix;
}

$('#submit-button').popover({
   'placement':'top',
   'content':'Drag the red marker and click me to confirm your location'
}).popover('show');
