import React from "react";
import ReactDOM from "react-dom";
import { DropTarget } from 'react-dnd';
import { ItemTypes } from "./constants";

const comparisonTarget = {
  drop(props, monitor) {
    props.handleDrop(monitor.getItem());
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
    this.state = {
      cityDetails: {}
    };
    // this.updateOnDrag = this.updateOnDrag.bind(this);
    // this.handleDrop = this.props.handleDrop.bind(this);
  }

  render() {
    const {connectDropTarget, isOver} = this.props;
    return connectDropTarget(
      <div style={{border: "dotted 1px black"}}>
      <pre>{JSON.stringify(this.props.city)}</pre>
      <h1>DRAG HERE SON</h1>
      </div>
    )
  }
};

export default DropTarget(ItemTypes.CARD, comparisonTarget, collect)(CityComparison);