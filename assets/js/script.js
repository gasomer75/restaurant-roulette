var switchDivEl = document.querySelector(".switch-container");
var rouletteButtonEl = document.querySelector(".roulette-button");
var restaurantImage = document.querySelector("#location-image");
var restaurantName = document.querySelector("#name");
var clickArray = [];
var apiArray = [];
var restaurantObjs = [];

const access_token = "_l5f7C7BDfq3ksCHSP4VGgHaTrUQoYkCxJRAKg1Um2gqJyxYHChBz_dB-vR4Gvlrzk00YQcsfqHemlq0aJ0EWtMJ5dEDoh436BSFUkpn-bZlV1ABayxGf1K3n-b9YXYx";
let myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + access_token);

var fetchInfo  = function() {
    restaurantObjs = [];
    apiUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&categories=&limit=10&location=Sacramento"
    for(var i = 0; i < clickArray.length; i++)
    {
        apiUrl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&categories=" 
            +  clickArray[i] + "&location=Sacramento"
        fetch(apiUrl, {
            headers: myHeaders 
            }).then((res) => {
                return res.json();
            }).then((json) => {
                //console.log(json);
                //console.log(json.businesses);
                //console.log(json.businesses[0].image_url);
                //restaurantImage.setAttribute("src", json.businesses[0].image_url);
                //restaurantName.textContent = json.businesses[0].name;
                restaurantObjs.push(json);
            });
    }
    console.log(restaurantObjs);   
    //console.log("length first: " + restaurantObjs.length);
    
    for(var i = 0; i < apiArray.length; i++)
    {
        console.log(apiArray[i]);
        for(var j = 0; j < restaurantObjs.length; j++)
        {
            console.log("length: " + restaurantObjs.length);
            for(var k = 0; k < restaurantObjs[j].businesses[0].categories.length; k++)
            {
                if(restaurantObjs[j].businesses[0].categories[k] == apiArray[i])
                {
                    console.log("found" + apiArray[i]);
                    console.log(restaurantObjs.businesses[0].name);
                }
            }
        }
    }
}


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
        clickArray.push("tradamerican")
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
        clickArray.push("indpak");

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
    fetchInfo();
}

switchDivEl.addEventListener("change", getInfo);
rouletteButtonEl.addEventListener("click", validateBoxes);
