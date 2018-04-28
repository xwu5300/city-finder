import React from 'react';

<<<<<<< HEAD:client/src/CityComparison/CityComparisonDataViz.jsx
import CompareRentBar from '../DataViz/CompareRentBar.jsx';
=======
import CompareRentBar from './components/charting/CompareRentBar.jsx';
import CompareCrimeBar from './components/charting/CompareCrimeBar.jsx';
import CompareHistCOL from './components/charting/CompareHistCOL.jsx';
>>>>>>> data viz views complete:client/src/DataViz.jsx


class CityComparisonDataViz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    };
  }

  render() {
    const {left, right} = this.props; //left and right are the left and right city objects
    console.log('cities as props', this.props.cities);

    const CompareRent = left !== '' && right !== '' ? (<div><CompareHistCOL cities={[left, right]}/><CompareRentBar cities={[left, right]}/><CompareCrimeBar cities={[left, right]}/></div>) : (<p>'Nothing to see here'</p>);
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

export default CityComparisonDataViz;