var buttonPress = document.getElementById('rouletteBtn')
var loadButton = document.getElementById('load-btn')
var picture1 = document.getElementById('picture1')
var restaurantName = document.getElementById('restaurantName')
var address = document.getElementById('address')
var zipCode = document.getElementById("zipCode")
var rating = document.getElementById("rating")
var reviews = document.getElementById("reviews")
var foodTypes = []
var markers = [];
var restaurants = [];
var map;
var service;
var center;
var marker;
var backClicked = 0;


function chosenPrice() {
    var priceDefault = 2;
    var priceInput = document.getElementById("price-dd").value;
    var priceSel = parseInt(priceInput);

        if (priceSel === 0 || priceSel === 1 || priceSel === 3 || priceSel === 4) {
            return priceSel;
        } else {
            return priceDefault;
            } 
};

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

function storeInfo(restaurantInfo) {
    restaurants.push(restaurantInfo);
    localStorage.setItem("restaurants", JSON.stringify(restaurants));
}

function setArray(restaurants)
{
    localStorage.setItem("restaurants", JSON.stringify(restaurants));
}

loadButton.addEventListener('click', function() {
    console.log("clicked");
    // get list from local storage
    var savedRestaurants = localStorage.getItem("restaurants");
    
    if(savedRestaurants === null)
    {
        return false;
    }
    // convert to array of objects
    savedRestaurants = JSON.parse(savedRestaurants);
    if(savedRestaurants.length > 1)
    {
        savedRestaurants.pop();
        restaurants.pop();
        setArray(savedRestaurants);
    }

    if(savedRestaurants[savedRestaurants.length-1])
    {
        // set page content
        restaurantName.textContent = savedRestaurants[savedRestaurants.length - 1].name;
        address.textContent = savedRestaurants[savedRestaurants.length - 1].address;
        picture1.src = savedRestaurants[savedRestaurants.length - 1].photo;

        // update map
        axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params:{
                address: savedRestaurants[savedRestaurants.length - 1].address,
                key: 'AIzaSyAONmMU3cYfY67VabnCdB5GEKU9dVUhYJQ'
            }
            })
            .then(function(response) {
                removeMarkers();
                coords = response.data.results[0].geometry.location;
                placeMarker(coords.lat, coords.lng, savedRestaurants[savedRestaurants.length - 1].name);
                moveMapCenter(coords.lat, coords.lng);
            })
    }
    
})


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
        console.log(response)
        center = response.data.results[0].geometry.location;
        console.log("old")
        console.log(center);
        searchRest(center);
    });   
    
})

function searchRest(center) {
    var priceLevel = chosenPrice();
    //console.log("made it")
    var request = {
        location: center,
        radius: '500',
        query: `${foodTypes.join(" ")} restaurant`,
        price_level: priceLevel

    };
    //console.log(request);
    var coords;
    service.textSearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        // console.log(results[Math.floor(Math.random()*results.length)])
        var randomRestaurant = results[Math.floor(Math.random()*results.length)]
        // console.log(randomRestaurant.photos[0].getUrl())
        restaurantName.textContent = randomRestaurant.name
        address.textContent = randomRestaurant.formatted_address
        rating.textContent = randomRestaurant.rating
        reviews.textContent = randomRestaurant.user_ratings_total
        if (randomRestaurant.photos) {
            var pictureLink = randomRestaurant.photos[0].getUrl();
            picture1.src= pictureLink;
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
            var restToSave = {
                name: randomRestaurant.name,
                address: randomRestaurant.formatted_address,
                coords: coords,
                photo: pictureLink
            };
            storeInfo(restToSave);
        })
      }
    });
}

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

