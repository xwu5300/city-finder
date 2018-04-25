import React from 'react';

import CompareRentBar from './components/charting/CompareRentBar.jsx';


class DataViz extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {left, right} = this.props; //left and right are the left and right city objects
    console.log('cities as props', this.props.cities);

    const CompareRent = left !== '' && right !== '' ? (<CompareRentBar cities={[left, right]}/>) : (<p>'Nothing to see here'</p>);
    return (
    <div style={{
      display: 'block'
    }}>
        {CompareRent}

        {left ? (`${left.city_name_short}'s average rent is ${left.rent_cost} compared to `) : ''}
        {right ? (`${right.city_name_short}'s ${right.rent_cost}`) : ''}
    </div>
    )
  }
}

export default DataViz;