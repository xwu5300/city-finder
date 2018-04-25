import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import axios from "axios";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


import Search from "./Search.jsx";
import Results from "./Results.jsx";
import {ItemTypes} from "./constants.js";
import CityHeadToHead from "./CityHeadToHead.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      favorites: [],
      showFavorites: false,
      selectedCities: {
        left: '',
        right: ''
      }
    };
    this.getCities = this.getCities.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.toggleFav = this.toggleFav.bind(this);
    this.setInfo = this.setInfo.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }
//gets weather data for each city on load
  componentDidMount() {
    this.getCities({}, () => {
      this.getWeather();
    });
  }

  handleDrop(city, position) {
    this.setState({
      selectedCities: Object.assign({}, this.state.selectedCities, {[position]: city})
    })
    // console.log(this.state.selectedCities);
  }

  toggleFav() {
    this.setState({
      showFavorites: !this.state.showFavorites
    });
  }

  setInfo(state, data) {
    this.setState({
      [state]: data
    });
  }

  // getCities will return the cities that match the query string
  getCities(state, CB = () => {}) {
    axios
      .get("/cities", {
        params: state
      })
      .then(results => {
        this.setState(
          {
            cities: results.data
          },
          CB
        );
      })
      .catch(error => {
        console.log("ERROR IN RESPONSE TO GET /cities:", error);
      });
  }
//get weather for cities in state
  getWeather() {
    var cities = this.state.cities;

    var cityIDs = [];
    for (var city of cities) {
      cityIDs.push(city.yahoo_weather_id);
    }

    var options = {
      method: "GET",
      url: "/weather",
      params: { cityIDs: cityIDs }
    };

    axios(options)
      .then(weatherData => {
        // Currently this function (fetchWeather in server/index.js) is not fast enough to use
          //at time of render. Therefore, it is not being used. 
        // console.log("weatherData from API call:", weatherData);
        // console.log("state after getCities and get weather: ", this.state);
        // console.log("time at end:");
      })
      .catch(err => {
        console.log(err);
      });
  }
//render header/title of site, search, and city views
  render() {
    return (
      <div className="app">
        <header className="navbar is-link is-fixed-top">
          <h1 className="has-text-weight-bold has-text-white is-size-1 is-lowercase">
            City Finder
          </h1>
        </header>
        <div className="main columns">
          <div className="column is-one-quarter">
            <Search
              getCities={this.getCities}
              getFaves={this.getFaves}
              showFavorites={this.state.showFavorites}
              toggleFav={this.toggleFav}
              setInfo={this.setInfo}
            />
          </div>
          <div className="column is-three-quarters">
            <Results
              cities={this.state.cities}
              favorites={this.state.favorites}
              setInfo={this.setInfo}
              showFavorites={this.state.showFavorites}
            />
          </div>
          <div>
            <CityHeadToHead/>
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);