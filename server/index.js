const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {fetchWeather} = require(path.join(__dirname + '/../database/helpers.js'));
const DB = require(path.join(__dirname + '/../database/database.js'));

const app = express();

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.json());

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

app.listen(process.env.PORT || 3000, () => {
  console.log('server listening on 3000!')
})


let makeQueryString = (props) => {
  // called everytime there is a change in state (aka a filter is selected/deselected)
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
