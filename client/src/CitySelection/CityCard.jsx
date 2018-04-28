import React from "react";
import ReactDOM from "react-dom";
import { ItemTypes } from '../constants.js';
import { DragSource } from 'react-dnd';

const cardSource = {
  beginDrag(props) {
    console.log('city being dragged is', props.city.city_name_short);
    return props.city;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class CityCard extends React.Component {
  constructor(props) {
    super(props);
    this.stylePopulation = this.stylePopulation.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.showDetails(e.target.name);
  }

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

  render() {
    const { connectDragSource, isDragging } = this.props;
    const city = this.props.city;
    let style = {
      backgroundImage: `url(./images/${city.id}.jpg)`,
      width: "300px",
      height: "200px",
      backgroundPosition: "center",
      backgroundSize: "cover"
    }
    const popString = this.stylePopulation(city.population);

    return connectDragSource(
      <div
        className="cityPanel"
        value={city.city_name_long}
        style={style}
        onClick={() => this.props.handleClick(city)}
        key={city._id}
      >
        <div className="container">
          <div className="overlay">
            <h2 className="has-text-black has-text-weight-bold">
              {city.city_name_short}, {city.state}
            </h2>
            <div className="has-text-black has-text-weight-semibold">
              Population: {popString}
            </div>
            <div className="has-text-black has-text-weight-semibold">
              Average rent: ${city.rent_cost}
            </div>
            <div className="has-text-black has-text-weight-semibold">
              Average high temp: {city.avg_high_temp}
              {"\xB0"}
            </div>
          </div>
          <div className="info">
            <h2 className="has-text-black has-text-weight-bold">
              {city.city_name_short}, {city.state}
            </h2>
          </div>
          <button name={city.city_name_short} onClick={this.handleClick}>See live twitter trends in this city!</button>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
};

export default DragSource(ItemTypes.CARD, cardSource, collect)(CityCard);