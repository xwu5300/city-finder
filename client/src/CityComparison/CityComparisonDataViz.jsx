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
    console.log('cities as props', this.props.cities);

<<<<<<< HEAD
    const CompareRent = left !== '' && right !== '' ? (<div><CompareHistCOL cities={[left, right]}/><CompareRentBar cities={[left, right]}/><CompareCrimeBar cities={[left, right]}/></div>) : (<p>'Nothing to see here'</p>);
=======
    const CompareRent = (left !== '' && right !== '') ? (<CompareRentBar cities={[left, right]}/>) : '';
>>>>>>> styling
    return (
    <div style={{
      display: 'block'
    }}>
        {CompareRent}
    </div>
    )
  }
}

export default CityComparisonDataViz;