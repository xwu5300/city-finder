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
    console.log('onclick', e.target.name);
    this.props.showDetails(e.target.name);
  }

  stylePopulation(population) {
    var reversed = population
      .toString()
      .split("")
      .reverse();
    for (var i = 3; i < reversed.length; i += 3) {
      reversed.splice(i++, 0, ",");
    }
    return reversed.reverse().join("");
  }

  render() {
    const { connectDragSource, isDragging } = this.props;
    const city = this.props.city;
    let style = {
      backgroundImage: `url(./images/${city.id}.jpg)`,
      width: 'auto',
      height: '375px',
      backgroundPosition: "center",
      backgroundSize: "cover",
      position: "relative",
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

        <div className="overlay">
            {/* <h2>
              {city.city_name_short}, {city.state}
            </h2> */}
        </div>
        <div className="info">
          <span className="city-name">{city.city_name_short}, {city.state}
          <button name={city.city_name_short} onClick={this.handleClick} style={{ border: 'none', backgroundColor: 'transparent' }}>
          <img name={city.city_name_short} src={require('../../dist/images/Twitter_Social_Icon_Circle_Color.svg')} alt="My logo" width="16"/>
          </button>
          </span>
        </div>

      </div>
    );
  }
};

export default DragSource(ItemTypes.CARD, cardSource, collect)(CityCard);