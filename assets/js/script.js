var buttonPress = document.getElementById('rouletteBtn')
var picture1 = document.getElementById('picture1')
var restaurantName = document.getElementById('restaurantName')
var address = document.getElementById('address')
var foodTypes = []
var map;
var service;
var center;


function initMap() {
    center= { lat: 38.575764, lng: -121.478851 };
    map = new google.maps.Map(document.getElementById("container1"), {
    center: center,
    zoom: 15
    });

    service = new google.maps.places.PlacesService(map);
}

buttonPress.addEventListener('click', function () {
    var request = {
        location: center,
        radius: '500',
        query: `${foodTypes.join(" ")} restaurant`
    };
    // console.log(request.query)
    service.textSearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // console.log(results[Math.floor(Math.random()*results.length)])
        var randomRestaurant = results[Math.floor(Math.random()*results.length)]
        // console.log(randomRestaurant.photos[0].getUrl())
        restaurantName.textContent = randomRestaurant.name
        address.textContent = randomRestaurant.formatted_address
        if (randomRestaurant.photos) {
            picture1.src=randomRestaurant.photos[0].getUrl()
        }
      }
    });
})

//food toggle button
function handleToggle(element) {
    if (element.checked) {
        if (foodTypes.indexOf(element.name) === -1) {
            foodTypes.push(element.name)
        }
    } else {
        foodTypes.splice(foodTypes.indexOf(element.name), 1)
    }
}