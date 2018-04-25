const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { fetchWeather, makeQueryString } = require(path.join(__dirname + '/../database/helpers.js'));
const CronJob = require('cron').CronJob;
const DB = require(path.join(__dirname + '/../database/database.js'));

const app = express();

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.json());

// let timer = new CronJob({
//   cronTime: '00 * * * * *',
//   onTick: function () {
//     // console.log('in scheduler factory')
//     console.log('tick');
//   },
//   start: true,
//   timeZone: 'America/New_York'
// });

app.get('/faves', (req, res) => {
  DB.getFavesFromDB((err, data) => {
    if (err) {console.log('ERROR IN GETTING FAVORITES FROM DB: ', err)}
    else {res.status(200).send(data)}
  })
})

app.post('/addFaves', (req, res) => {
  DB.addToDB(req.body)
})

app.post('/deleteFaves', (req, res) => {
  DB.deleteFromDB(req.body)
  res.status(200).send(JSON.stringify(req.body))
})

app.get('/cities', (req, res) => {
  // make a query to the database using queryString
  // queryString created by makeQueryString function
  let temp = (req.query !== '{}') ? req.query[0] : {};
  let queryString = makeQueryString(temp)
  DB.queryDB(queryString, (err, docs) => {
    if (err) {console.log('ERROR IN GETTING RESULTS FROM DB: ', err)}
    else {
      res.status(200).send(docs); //returns cities that match queryString to getCities in index.jsx
    }
  })    
});

app.get('/weather', (req, res) => {
  var stringOfCityIDs = req.query.cityIDs.join(','); //gets all city IDs for API call

  fetchWeather(stringOfCityIDs, (err, data) => { //calls fetchWeather in helpers.js
    if (err) {
      console.log('ERROR FETCHING WEATHER: ',err);
      res.status(500).send('Server error! Unable to fetch weather.')
    } else {
      res.status(200).send(data); //sends data back to getWeather in index.jsx
    }
  })
});

app.listen(process.env.PORT || 3005, () => {
  console.log('server listening on 3000!')
})