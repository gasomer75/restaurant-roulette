var switchDivEl = document.querySelector(".switch-container");
var rouletteButtonEl = document.querySelector(".roulette-button");
var restaurantImage = document.querySelector("#location-image");
var restaurantName = document.querySelector("#name");
var clickArray = [];
var apiArray = [];
var restaurantObjs = [];

var buttonPress = document.getElementById('#rouletteBtn')

var restaurants = []
var map;
var service;
var queryString = "";

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

    queryString = "";
    for(var i = 0; i < clickArray.length; i++)
    {
        queryString += clickArray[i] + " ";
    }
    queryString += "restaurant"
    console.log(queryString);
    request.query = queryString;

    service = new google.maps.places.PlacesService(map);

      service.textSearch(request, function(results, status) {
          console.log(status)
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log(results);
            /*results.forEach(function(item) {
                console.log(`restaurant is: ${item.name} price is: ${item.price_level} photo is: ${item.photos} address is: ${item.formatted_address}`)
            })*/
          /*console.log(results[Math.floor(Math.random()*results.length)])
          restaurants = results*/
        }
      });
}

/*buttonPress.addEventListener('click', function () {
    initMap();
    console.log(restaurants[Math.floor(Math.random()*restaurants.length)]);
})*/

//when roulette btn pushed, call service text search
var getInfo = function(event) {
    console.log(event.target.getAttribute("data-foodType"));
}

var validateBoxes = function() {
    var americanSwitch = document.querySelector("#american-switch");
    var chineseSwitch = document.querySelector("#chinese-switch");
    var italianSwitch = document.querySelector("#italian-switch");
    var indianSwitch = document.querySelector("#indian-switch");
    var japaneseSwitch = document.querySelector("#japanese-switch");
    var mexicanSwitch = document.querySelector("#mexican-switch");

    clickArray = [];
    apiArray = [];

    if(americanSwitch.checked)
    {
        clickArray.push("american")
    }
    if(chineseSwitch.checked)
    {
        clickArray.push("chinese")
    }
    if (italianSwitch.checked)
    {
        clickArray.push("italian")
    }
    if(indianSwitch.checked)
    {
        clickArray.push("indian");

    }
    if(japaneseSwitch.checked)
    {
        clickArray.push("japanese");
    }
    if(mexicanSwitch.checked)
    {
        clickArray.push("mexican");
    }
    console.log(clickArray); 

    for(var i = 0; i < 5; i++)
    {
        var arrayEl = clickArray[Math.floor(Math.random() * clickArray.length)];
        apiArray.push(arrayEl);
    }
    console.log(apiArray);
    initMap();
}

switchDivEl.addEventListener("change", getInfo)
rouletteButtonEl.addEventListener("click", validateBoxes)
