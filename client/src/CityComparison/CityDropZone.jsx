import React from "react";
import ReactDOM from "react-dom";
import { DropTarget } from 'react-dnd';
import { ItemTypes } from "../constants";

const comparisonTarget = {
  drop(props, monitor) {
    props.handleDrop(monitor.getItem(), props.position);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}
class CityDropZone extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {connectDropTarget, isOver, city, position} = this.props;
    return connectDropTarget(
      <div style={{
        border: "solid 1px black",
        height: '4vh',
        width: "49%",
        display: 'inline-block',
        float: 'right',
        // backgroundImage: `url(./images/${city.id}.jpg)`,
        backgroundPosition: "bottom",
        backgroundSize: "cover"
      }}>
      <div className="drop-city">
        <span className="drop-city">{city ? city.city_name_short : ''}</span>
      </div>
      </div>
    )
  }
};

export default DropTarget(ItemTypes.CARD, comparisonTarget, collect)(CityDropZone);