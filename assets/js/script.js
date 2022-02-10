var buttonPress = document.getElementById('rouletteBtn')
var picture1 = document.getElementById('picture1')
var restaurantName = document.getElementById('restaurantName')
var address = document.getElementById('address')
var rating = document.querySelector('.rating')
var totalRatings = document.getElementById('reviews')
var opening = document.getElementById('open')
var foodTypes = []
var markers = [];
var map;
var service;
var center;
var marker;


function initMap() {
    var options = {
        zoom:13,
        center:{ lat: 38.575764, lng: -121.478851 }
    }

    map = new google.maps.Map(document.getElementById("map"), options);

    service = new google.maps.places.PlacesService(map);
}

function placeMarker(lat, lng, name)
{
    var marker = new google.maps.Marker({
        position: {lat: lat, lng: lng},
        map: map
    });

    var infoWindow = new google.maps.InfoWindow({
        content: '<h3>' + name +'</h3>'
    });

    marker.addListener("click", function(){
        infoWindow.open(map, marker);
    });

    markers.push(marker);
}

function removeMarkers() {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

buttonPress.addEventListener('click', function () {
    // get latitude and longitude based on user zip code
    //console.log("zip: " + zipCode.value);
    axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params:{
            address: zipCode.value,
            key: 'AIzaSyAONmMU3cYfY67VabnCdB5GEKU9dVUhYJQ'
        }
    })
    .then(function(response){
        //console.log(response)
        center = response.data.results[0].geometry.location;
        //console.log(center);
        searchRest(center);
    });   
    
})

function searchRest(center) {
    //console.log("made it")
    var request = {
        location: center,
        radius: '500',
        query: `${foodTypes.join(" ")} restaurant`
    };
    //console.log(request);
    var coords;
    service.textSearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
         console.log(results[Math.floor(Math.random()*results.length)])
        var randomRestaurant = results[Math.floor(Math.random()*results.length)]
        // console.log(randomRestaurant.photos[0].getUrl())
        restaurantName.textContent = randomRestaurant.name
        address.textContent = randomRestaurant.formatted_address
        rating.textContent = randomRestaurant.rating
        totalRatings.textContent = randomRestaurant.user_ratings_total
        

        if (randomRestaurant.photos) {
            picture1.src=randomRestaurant.photos[0].getUrl()
        }
        axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
        params:{
            address: randomRestaurant.formatted_address,
            key: 'AIzaSyAONmMU3cYfY67VabnCdB5GEKU9dVUhYJQ'
        }
        })
        .then(function(response) {
            //console.log(response);
            removeMarkers();
            coords = response.data.results[0].geometry.location;
            //console.log(coords);
            placeMarker(coords.lat, coords.lng, randomRestaurant.name);
            moveMapCenter(coords.lat, coords.lng);
        })
      }
    });
})

function moveMapCenter(lat, lng) {
    var newCent = new google.maps.LatLng(lat, lng);
    window.map.panTo(newCent);
}

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
