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
      },
      isDisplay: true,
    }
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop(city, position) {
    this.setState({
      selectedCities: Object.assign({}, this.state.selectedCities, {[position]: city})
    })
  }

  hideChart() {

  }

  render() {
    const {left, right} = this.state.selectedCities;

    return (
    <div className="city-comparison-container">
      <div className="city-drop-zones">
        <button className="bubble-map-viz">
        </button>
        <button className="hide-chart" onClick={()=>{this.setState({isDisplay: !this.state.isDisplay})}}>
          hide
        </button>
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
      <div className="city-data-viz">
        <CityComparisonDataViz left={left} right={right} isDisplay={this.state.isDisplay}/>
      </div>
    </div>
    )
  }
}

export default CityComparisonContainer;