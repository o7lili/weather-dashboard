var APIKey = "accdf62d9c64a67f462fbd3614d0d497";
var city = "Raleigh";
var lat;
var lon;
// get weather = https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// get lat&lon = http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}


// API request for latitude and longitude geo data
var getLatLon = function() {
    // var latLonURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + APIKey;
    // var latitude;
    // var longitude;

    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIKey);
    // .then(function (response) {
    //     return response.json();

    // .then(function (data) {
    //     console.log("data from getLatLon is:");
    //     console.log(data);
    //     latitude = data[0].lat;
    //     longitude = data[0].lon;
    //     console.log("latitude is " + latitude);
    //     console.log("longitude is " + longitude);
    // })
}

// var getWeather = function() {
//     console.log("function called");
// };

getLatLon();