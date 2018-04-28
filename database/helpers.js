const axios = require('axios');
// const YQL = require('YQL');

let makeQueryString = (props) => {
  // called every time there is a change in state (aka a filter is selected/deselected)
  // returns a string that is used to query the database 

  // example query string: {"$and": [{"$or": [{"region": "Northeast"}, {"region": "Rockies"}]},
  //                                 {"$or": [{"temperature": "hot"}, {"temperature": "mild"}]}]}

  let oneCategoryQuery = []
  let queries = (props ? JSON.parse(props) : {}) //if no filters selected, eventually return "{}"
  for (let category in queries) { 
    let oneQuery = [];
    if (queries[category].length > 0) {
      queries[category].forEach((selection) => {
        let oneFilter = {};
        oneFilter[category] = selection;
        oneQuery.push(oneFilter);
      })
      let oneCategory = {}
      oneCategory["$or"] = oneQuery; //return cities that match filters in one category (e.g., hot or mild if both are selected)
      oneCategoryQuery.push(oneCategory)
    }
  }
  let allFilters = {}
  if(oneCategoryQuery.length > 0){ 
    allFilters["$and"] = oneCategoryQuery;
  } 
  return JSON.stringify(allFilters)
}

// Returns weatherData for the cities. Currently, the result of this function is logged to the console on the client side
// fetchWeather = function(cityIDs, callback) {
//   // API DOCUMENTATION LINKS FOR fetchWeather:
//   // https://gist.github.com/ydn/6ef5a695e871b8a628d0#file-weather-js
//   // https://developer.yahoo.com/weather/

//   var query = new YQL(`SELECT * FROM weather.forecast where woeid in(${cityIDs})`)
//   query.exec((err, data) => {
//     if (err) {
//       callback(err, null);
//     } else {

//       var weatherData = data.query.results.channel;

//       // importantData is an array of objects which hold the cityWeather data retrieved from the API
//       var importantData = [];


//       for (var city of weatherData) {
//         // extract weatherID from link
//         var yahoo_weather_id = parseInt(city.item.link.slice(108, 115));

//         // PULL OUT IMPORTANT DATA FROM RESPONSE AND REORGANIZE BEFORE SENDING
//         var cityWeather = {
//           yahoo_weather_id: yahoo_weather_id,
//           city_name_short: city.location.city,
//           state: city.location.region,
//           current_temp: parseInt(city.item.condition.temp),
//           current_description: city.item.condition.text,
//           wind_chill: parseInt(city.wind.chill),
//           current_wind: parseInt(city.wind.speed),
//           link: city.link
//         }
//         importantData.push(cityWeather);
//       }

//       callback(null, importantData);
//     }
//   });
// }

exports.makeQueryString = makeQueryString;
// exports.fetchWeather = fetchWeather;