function initMap() {
    var center= { lat: 38.575764, lng: -121.478851 };
    var map = new google.maps.Map(document.getElementById("container1"), {
    center: center,
    zoom: 15
    });

    var request = {
        location: center,
        radius: '500',
        query: "mexican chinese restaurant"
    };

      var service = new google.maps.places.PlacesService(map);

      service.textSearch(request, function(results, status) {
          console.log(status)
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log(results)
        }
      });
}

