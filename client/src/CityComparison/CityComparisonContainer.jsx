import React from 'react';
import CityDropZone from './CityDropZone.jsx';
import CityComparisonDataViz from './CityComparisonDataViz.jsx';

class CityComparisonContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCities: {
        left: '',
        right: ''
      }
    }
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop(city, position) {
    this.setState({
      selectedCities: Object.assign({}, this.state.selectedCities, {[position]: city})
    })
  }

  render() {
    const {left, right} = this.state.selectedCities;
    return (
    <div className="city-comparison-container">
      <div className="city-drop-zones">
        <div>
        <CityDropZone
          city={this.state.selectedCities.left}
          handleDrop={this.handleDrop}
          position="left" key="left"
        />
        </div>
        <div>
        <CityDropZone
          city={this.state.selectedCities.right}
          handleDrop={this.handleDrop}
          position="right" key="right"
        />
        </div>
      </div>
      <div>
        <CityComparisonDataViz left={left} right={right}/>
      </div>
    </div>
    )
  }
}

export default CityComparisonContainer;