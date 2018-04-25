import React from "react";
import ReactDOM from "react-dom";
import { DropTarget } from 'react-dnd';
import { ItemTypes } from "./constants";

const comparisonTarget = {
  drop(props, monitor) {
    console.log('received props of', props); //get props somehow???
    console.log('got item of', monitor.getItem());
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
    const {connectDropTarget, isOver} = this.props;
    return connectDropTarget(
      <div style={{border: "dotted 1px black"}}>
      <h1>DRAG HERE SON</h1>
      </div>
    )
  }
};

export default DropTarget(ItemTypes.CARD, comparisonTarget, collect)(CityComparison);