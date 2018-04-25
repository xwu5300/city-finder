import React from "react";
import axios from "axios";
import CityCard from "./CityCard.jsx";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.stylePopulation = this.stylePopulation.bind(this);
    this.deleteOrSave = this.deleteOrSave.bind(this);
  }
  //adds clicked city to favorites in database
  save(city) {
    axios
      .post("/addFaves", {
        city: city
      })
      .then(res => {
        res.end();
      })
      .catch(err => {
        console.log("ERR IN SAVE CITY CLIENT:", err);
      });
  }
  
  //removes clicked city from favorites in database
  delete(city) {
    axios
      .post("/deleteFaves", {
        city: city
      })
      .then(res => {
        axios.get("/faves").then(data => {
          this.props.setInfo("favorites", data.data);
        });
      })
      .catch(err => {
        console.log("ERR IN SAVE CITY CLIENT:", err);
      });
  }

  deleteOrSave(city) {
    this.props.showFavorites ? this.delete(city): this.save(city);
  }

  //converts population number into a string and formats it with commas for better readability/user experience
  stylePopulation(population) {
    var reversed = population
      .toString()
      .split("")
      .reverse();
    for (var i = 3; i < reversed.length; i += 3) {
      reversed.splice(i, 0, ",");
      i++;
    }
    return reversed.reverse().join("");
  }

  //renders each city from props.display or props.favorites
  //if favorites is clicked (and therefore props.showFavorites = true), display favorite cities
  //The degrees symbol for temperature data display is inserted using {"\xB0"} 
  render() {
    let display = this.props.cities;
    if (this.props.showFavorites) {
      display = this.props.favorites;
    }

    if (display.length > 0) {
      return (
        <div className="cities">
          {display.map(city => {
            let style = {
              backgroundImage: `url(./images/${city.id}.jpg)`,
              width: "300px",
              height: "200px",
              backgroundPosition: "center",
              backgroundSize: "cover"
            };

            var popString = this.stylePopulation(city.population);
            console.log(display);
            return (
              <div id="temp" key={city._id}>
              <CityCard city={city} handleClick={this.deleteOrSave}/>
            </div>
            );
          })}
        </div>
      );
    } else if (display === this.props.favorites) {
      return <div>No favorites saved. Please select favorite cities</div>;
    } else {
      return (
        <div>No cities match your search. Please select fewer filters.</div>
      );
    }
  }
}

export default Results;
