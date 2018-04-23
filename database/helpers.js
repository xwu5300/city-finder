const axios = require('axios');
const YQL = require('YQL');

// Returns the weatherdata for the cities. Currently, the result of this function is logged to the console on the client side
fetchWeather = function(cityIDs, callback) {

  var query = new YQL(`SELECT * FROM weather.forecast where woeid in(${cityIDs})`)
  query.exec((err, data) => {
    if (err) {
      callback(err, null);
    } else {

      var weatherData = data.query.results.channel;

      // importantData is an array of objects which hold the cityWeather data retrieved from the API
      var importantData = [];


      for (var city of weatherData) {
        // extract weatherID from link
        var yahoo_weather_id = parseInt(city.item.link.slice(108, 115));

        // PULL OUT IMPORTANT DATA FROM RESPONSE AND REORGANIZE BEFORE SENDING
        var cityWeather = {
          yahoo_weather_id: yahoo_weather_id,
          city_name_short: city.location.city,
          state: city.location.region,
          current_temp: parseInt(city.item.condition.temp),
          current_description: city.item.condition.text,
          wind_chill: parseInt(city.wind.chill),
          current_wind: parseInt(city.wind.speed),
          link: city.link
        }
        importantData.push(cityWeather);
      }

      callback(null, importantData);
    }
  });
}

exports.fetchWeather = fetchWeather;

// API DOCUMENTATION LINKS:
// https://gist.github.com/ydn/6ef5a695e871b8a628d0#file-weather-js
// https://developer.yahoo.com/weather/