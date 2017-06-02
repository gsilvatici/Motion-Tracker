    // Initialize Cordova plugins

//            window.screen.orientation.lock('portrait');

    // The watch id references the current `watchAcceleration`
    var watchID = null;

    var webtaskURL = "https://wt-210a0744fa5cd1b641dc6a2bbd8fb340-0.run.webtask.io/motiont-listener";


    var magnitude;

    var latitude;

    var longiutde;
    // Wait for Cordova to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
        document.addEventListener("pause", onPause, false);
        startWatch();
    }

    // Start watching the acceleration
    //
    function startWatch() {
        // Update acceleration every 1 ms
        var options = { frequency: 1 };
        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    }


    // onSuccess: Get a snapshot of the current acceleration
    //
    function onSuccess(acceleration) {
        magnitude = accelMagnitude(acceleration);

        //Alert device if the acceleration surpass some limit (40m/s) and vibrates for 5 ms
        if (magnitude >= 70) {
            navigator.vibrate(500);
            navigator.geolocation.getCurrentPosition(locationHandler, onError);
            //make a web request with the environmental values
            var lat = latitude;
            var lon = longiutde;
            var time = getTime();
            $.get( webtaskURL + "?accel=" + magnitude + "&lat=" + lat + "&lon=" + lon + "&time=" + time);
        }
    }

    var getTime = function() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();
      var hour = today.getHours();
      var min = today.getMinutes();
      var sec = today.getSeconds();

      if(dd < 10) {
          dd = '0' + dd;
      }

      if(mm < 10) {
          mm = '0' + mm;
      }

      today = mm + '/' + dd + '/' + yyyy + ' ' + hour + ':' + min + ':' + sec;

      return today;
    }

    // Stop watching the acceleration
    //
    function stopWatch() {
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    }

    //Background event handler
    //
    function onPause() {
        startWatch();
    }

    //accelMagnitude: calculates de magnitude of the acceleration vector
    //
    function accelMagnitude(acceleration) {
        var x = acceleration.x;
        var y = acceleration.y;
        var z = acceleration.z;
        var magnitude = Math.sqrt(x*x + y*y + z*z);
        magnitude = Math.round(magnitude * 100) / 100
        return magnitude;
    }

    // onError: Failed to get the acceleration
    //
    function onError() {
        alert('Error!');
    }


    var locationHandler = function(position) {
        latitude = position.coords.latitude;
        longiutde = position.coords.longitude;
    };

    navigator.geolocation.getCurrentPosition(locationHandler, onError);
