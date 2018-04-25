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

class ComparedCity extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {connectDropTarget, isOver, city, position} = this.props;
    return connectDropTarget(
      <div style={{
        border: "dotted 2px black",
        height: '250px',
        width: "45%",
        display: 'inline-block',
        float: 'left'
      }}>
        <pre>THIS IS THE {position} BOX</pre>
        <h1>{city ? city.city_name_short : ''}</h1>
      </div>
    )
  }
};

export default DropTarget(ItemTypes.CARD, comparisonTarget, collect)(ComparedCity);