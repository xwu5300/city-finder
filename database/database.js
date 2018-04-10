const mongoose = require('mongoose');

if (!process.env.MLAB_URL) {
  var {MLAB_URL} = require('../config.js');
}

mongoose.connect(process.env.MLAB_URL || MLAB_URL);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected!!')
});

const citySchema = mongoose.Schema({
  id: Number,
  city_name_short: String,
  city_name_long: String,
  state: String,
  region: String,
  avg_high_temp: Number,
  avg_rent: Number, 
  avg_rent_index: Number, 
  by_ocean: Boolean,
  by_mountains: Boolean,
  by_lake: Boolean,
  population: Number,
  zip_code: Number,
  image_url: String
});

const City = mongoose.model('City', citySchema);

// remember to export functions made in this file

let queryDB = (queryObj, callback) => {

}

exports.queryDB = queryDB;
