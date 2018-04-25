import React from "react";
import ReactDOM from "react-dom";
import { DropTarget } from 'react-dnd';
import { ItemTypes } from "./constants";

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

class CityComparison extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {connectDropTarget, isOver, city, position} = this.props;
    return connectDropTarget(
      <div style={{border: "dotted 1px black"}}>
      <pre>THIS IS THE {position} BOX</pre>
      <h1>{city ? city.city_name_short : ''}</h1>
      </div>
    )
  }
};

export default DropTarget(ItemTypes.CARD, comparisonTarget, collect)(CityComparison);