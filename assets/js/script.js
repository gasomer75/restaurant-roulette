var buttonPress = document.getElementById('rouletteBtn')

var restaurants = []
var map;
var service;

function initMap() {
    var center= { lat: 38.575764, lng: -121.478851 };
    map = new google.maps.Map(document.getElementById("container1"), {
    center: center,
    zoom: 15
    });

    var request = {
        location: center,
        radius: '500',
        query: "mexican chinese italian restaurant"
    };

    service = new google.maps.places.PlacesService(map);

      service.textSearch(request, function(results, status) {
          console.log(status)
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            results.forEach(function(item) {
                console.log(`restaurant is: ${item.name} price is: ${item.price_level} photo is: ${item.photos} address is: ${item.formatted_address}`)
            })
          console.log(results[Math.floor(Math.random()*results.length)])
          restaurants = results
        }
      });
}

buttonPress.addEventListener('click', function () {
    initMap ()
    console.log(restaurants[Math.floor(Math.random()*restaurants.length)])
})

//when roulette btn pushed, call service text search

