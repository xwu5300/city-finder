const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

if (!process.env.MLAB_URL) {
  var {MLAB_URL} = require('../config.js');
}

mongoose.connect(process.env.MLAB_URL || MLAB_URL);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to database!!')
});

// ======================
// The data in the citySchema is currently hardcoded. Was created in an Excel file, converted to csv, and then imported to mlab
// 
// http://docs.mlab.com/migrating/
// Use example located under this header -> "Importing a JSON, CSV or TSV file"
// ======================

// Schema representing the cities that populate on clicking the filter buttons
const citySchema = mongoose.Schema({
  id: Number,
  city_name_short: String,
  city_name_long: String,
  state: String,
  region: String,
  avg_high_temp: Number,
  climate: String,
  rent_cost: String,
  rent: String, 
  avg_rent_index: Number, 
  by_ocean: String,
  by_mountains: String,
  by_lake: String,
  population: Number,
  city_size: String,
  zip_code: Number,
  image_url: String,
  yahoo_weather_id: Number
});

const City = mongoose.model('City', citySchema);

// Schame representing the favorite cities that are saved by the user
const favSchema = mongoose.Schema({
  _id: String,
  id: Number,
  city_name_short: String,
  city_name_long: String,
  state: String,
  region: String,
  avg_high_temp: Number,
  climate: String,
  rent_cost: String,
  rent: String, 
  avg_rent_index: Number, 
  by_ocean: String,
  by_mountains: String,
  by_lake: String,
  population: Number,
  city_size: String,
  zip_code: Number,
  yahoo_weather_id: Number,
  image_url: String
})

const Favorites = mongoose.model('Favorites', favSchema)
// remember to export functions made in this file

let queryDB = (queryObj, callback) => {
  // Temp is first compared to a stringified empty object because it has to be passed from the server as a string
    // if temp is '{}', set it to an empty object
    // else
      // parse the stringified queryObj
  let temp = (queryObj === '{}') ? {} : JSON.parse(queryObj);
  // Use temp variable to find the matching cities in the database
  City.find(temp, (err, docs) => {
    if (err) { console.log('ERROR IN QUERYING THE CITY DATABASE! ERROR IS: ', err) };
    
    callback(err, docs);
  })
}

// Adding a city to the favorites table
let addToDB = (data) => {
  Favorites.create(data.city)
}

// Deleting a city from the favorites database with the correct city id
let deleteFromDB = (data) => {
  Favorites.deleteOne({"id": data.city.id}, (err, data) => {
    console.log('ERROR IN DELETING FROM THE DATASE! ERROR IS: ', err)
  })
}

// Return all the cities that are currently stored in the favorites table
let getFavesFromDB = (callback) => {
  console.log('in get faves whoo!')
  Favorites.find({}, (err, data) => {
    if (err) { console.log('ERROR IN QUERYING THE FAVORITES DATABASE! ERROR IS: ', err) };
    callback(err, data);
  })
}





exports.queryDB = queryDB;
exports.getFavesFromDB = getFavesFromDB;
exports.addToDB = addToDB;
exports.deleteFromDB = deleteFromDB;
