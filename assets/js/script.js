function initMap() {
    var center= { lat: 38.5816, lng: 121.4944 };
    var map = new google.maps.Map(document.getElementById("container1"), {
    center: center,
    zoom: 15
    });

    var request = {
        query: 'Museum of Contemporary Art Australia',
        fields: ['name', 'geometry'],
      };

      var service = new google.maps.places.PlacesService(map);

      service.findPlaceFromQuery(request, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log(results)
        }
      });
}