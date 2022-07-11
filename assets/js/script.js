// get weather: https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// get lat&lon: http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
var APIKey = "accdf62d9c64a67f462fbd3614d0d497";
// example city for testing purposes
var userCity = "Raleigh";

// variables for searching section of page
var searchFormEl = document.querySelector("#search-form");

// variables for user searched city
var searchedCity = document.querySelector("#weather-city");
var searchedIcon = document.querySelector("#weather-icon");
var date = moment().format('L');
var searchedTemp = document.querySelector("#weather-temp");
var searchedWind = document.querySelector("#weather-wind");
var searchedHumidity = document.querySelector("#weather-humidity");
var searchedUVIndex = document.querySelector("#weather-uvi");
var iconsURL = "http://openweathermap.org/img/wn/" 

// API request for latitude and longitude geo data
var getLatLon = function() {
    // format direct openweathermap api url
    var latLonURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + userCity + "&appid=" + APIKey;
    var latitude;
    var longitude;

    // make a request to the url
    fetch(latLonURL).then(function(response) {
        return response.json();
    })
    .then(function (data) {
        // console.log("data from latLonURL is:");
        // console.log(data);
        latitude = data[0].lat;
        longitude = data[0].lon;
        // console.log("latitude is " + latitude);
        // console.log("longitude is " + longitude);
        userCity = data[0].name
        getWeather(latitude, longitude);
    })
};

getLatLon();

// API request for lat & lon fetched for weather
var getWeather = function(latitude, longitude) {
    // console.log("getWeather function latitude is " + latitude);
    // console.log("getWeather function longitude is " + longitude);

    // format onecall openweathermap api url
    var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=" + APIKey;

    fetch(weatherURL).then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log("data from getWeather function is:");
        console.log(data);

        temperature = data.current.temp
        wind = data.current.wind_speed
        humidity = data.current.humidity
        uvIndex = data.current.uvi
        forecast = data.daily
        weatherIcon = data.current.weather[0].icon

        console.log("current weather is temp: " + temperature + ", wind: " + wind + ", humidity: " + humidity + ", uv index: " + uvIndex);

        showWeather(temperature, wind, humidity, uvIndex, weatherIcon, forecast);
    })
};

// display fetched weather data to page
var showWeather = function(temperature, wind, humidity, uvIndex, weatherIcon, forecast) {
    // displays weather info for user searched city
    searchedCity.textContent = userCity  + " (" + date + ")";
    searchedIcon.setAttribute("src", iconsURL + weatherIcon + ".png");
    searchedTemp.textContent = "Temp: " + temperature + "° F";
    searchedWind.textContent = "Wind: " + wind + " MPH";
    searchedHumidity.textContent = "Humidity: " + humidity + "%";
    searchedUVIndex.textContent = uvIndex;

    // UV Index styling
    if (uvIndex <= 2.99) {
        searchedUVIndex.setAttribute("style", "color: white; background-color: green; margin-left: 5px; padding: 2px 15px; border-radius:6px");
    }
    else if (uvIndex <= 7.99) {
        searchedUVIndex.setAttribute("style", "color: white; background-color: orange; margin-left: 5px; padding: 2px 15px; border-radius:6px");
    }
    else if (uvIndex > 7.99) {
        searchedUVIndex.setAttribute("style", "color: white; background-color: red; margin-left: 5px; padding: 2px 15px; border-radius:6px");
    }
}
// searchFormEl.addEventListener("submit", formSearchHandler);