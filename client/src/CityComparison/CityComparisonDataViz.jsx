import React from 'react';

import CompareRentBar from '../DataViz/CompareRentBar.jsx';
import CompareCrimeBar from '../DataViz/CompareCrimeBar.jsx';
import CompareHistCOL from '../DataViz/CompareHistCOL.jsx';


class CityComparisonDataViz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    };
  }

  render() {
    const {left, right} = this.props; //left and right are the left and right city objects
    // console.log('cities as props', this.props.cities);

    const CompareRent = (left !== '' && right !== '' && this.props.isDisplay) ? (<CompareRentBar cities={[left, right]}/>) : '';
    return (
    <div style={{
      display: 'block',
    }}>
        {CompareRent}
    </div>
    )
  }
}

export default CityComparisonDataViz;