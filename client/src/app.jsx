import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import axios from "axios";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


import Filter from "./Filter.jsx";
import CitySelectionContainer from "./CitySelection/CitySelectionContainer.jsx";
import {ItemTypes} from "./constants.js";
import CityComparisonContainer from "./CityComparison/CityComparisonContainer.jsx";
import UsDataOverview from "./DataViz/UsDataOverview.jsx";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

const styles = {
  customWidth: {
    height: '10px',
  },
};


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
        // console.log('got results from getCities!')
        this.setState(
          {
            cities: results.data
          }
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
    console.log(window.innerHeight);
    return (
        <MuiThemeProvider>
          <div className="app">
            <header className="navbar">
              <span className="title">
                City Finder
              </span>
              <span className="filter">
                Cost of Living:
                <DropDownMenu value={1} style={styles}>
                  <MenuItem value={1} primaryText="None" />
                  <MenuItem value={2} primaryText="Low" />
                  <MenuItem value={3} primaryText="Medium" />
                  <MenuItem value={4} primaryText="High" />
                </DropDownMenu>
              </span>

              <span className="filter">
                Weather:
                <DropDownMenu value={1}>
                  <MenuItem value={1} primaryText="None" />
                  <MenuItem value={2} primaryText="Cold" />
                  <MenuItem value={3} primaryText="Mild" />
                  <MenuItem value={4} primaryText="Hot" />
                </DropDownMenu>
              </span>

              <span className="filter">
                Region:
                <DropDownMenu value={1}>
                  <MenuItem value={1} primaryText="None" />
                  <MenuItem value={2} primaryText="NorthEast" />
                  <MenuItem value={3} primaryText="MidWest" />
                  <MenuItem value={4} primaryText="SouthWest" />
                  <MenuItem value={5} primaryText="Rockies" />
                  <MenuItem value={6} primaryText="Pacific" />
                </DropDownMenu>
              </span>

              <span className="filter">
                Environment:
                <DropDownMenu value={1}>
                  <MenuItem value={1} primaryText="None" />
                  <MenuItem value={2} primaryText="Near the Ocean" />
                  <MenuItem value={3} primaryText="In the Mountains" />
                  <MenuItem value={4} primaryText="Near Major Lake" />
                </DropDownMenu>
              </span>

              <span className="filter">
                Metro Size:
                <DropDownMenu value={1}>
                  <MenuItem value={1} primaryText="None" />
                  <MenuItem value={2} primaryText="Small" />
                  <MenuItem value={3} primaryText="Mid-size" />
                  <MenuItem value={4} primaryText="Big" />
                </DropDownMenu>
              </span>
            </header>
            <div className="main columns">
              <div>
                <CitySelectionContainer
                    cities={this.state.cities}
                    favorites={this.state.favorites}
                    setInfo={this.setInfo}
                    showFavorites={this.state.showFavorites} />
              </div>
              {/* <div >
                <Filter
                  getCities={this.getCities}
                  getFaves={this.getFaves}
                  showFavorites={this.state.showFavorites}
                  toggleFav={this.toggleFav}
                  setInfo={this.setInfo}
                />
              </div> */}
              <div className="comparison">
                <CityComparisonContainer cities={this.state.cities}/>
              </div>
              {/* <div className="column is-three-quarters">
                {this.state.cities.length && <UsDataOverview cities={this.state.cities}/>}
              </div> */}

            </div>

          </div>
        </MuiThemeProvider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);