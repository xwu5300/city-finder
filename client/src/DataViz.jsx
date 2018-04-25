import React from 'react';

class DataViz extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {left, right} = this.props; //left and right are the left and right city objects
    return (
    <div style={{
      display: 'block'
    }}>
        {left ? (`${left.city_name_short}'s average rent is ${left.rent_cost} compared to `) : ''}
        {right ? (`${right.city_name_short}'s ${right.rent_cost}`) : ''}
    </div>
    )
  }
}

export default DataViz;