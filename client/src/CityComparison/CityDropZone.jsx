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
        border: "dotted 2px black",
        height: 'auto',
        width: "48%",
        display: 'inline-block',
        float: 'left',
        backgroundImage: `url(./images/${city.id}.jpg)`,
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}>
        <h1>{city ? city.city_name_short : ''}</h1>
      </div>
    )
  }
};

export default DropTarget(ItemTypes.CARD, comparisonTarget, collect)(CityDropZone);