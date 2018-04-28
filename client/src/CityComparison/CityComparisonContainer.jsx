import React from 'react';
import CityDropZone from './CityDropZone.jsx';
import CityComparisonDataViz from './CityComparisonDataViz.jsx';
import UsDataOverview from '../DataViz/UsDataOverview.jsx';
import Modal from 'react-modal';

const customStyles = {
  content : { 
    width                 : '1400px',
    height                : '900px',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    background            : 'black',
  }
};

class CityComparisonContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCities: {
        left: '',
        right: ''
      },
      isDisplay: true,
      modalIsOpen: false,
    }
    this.handleDrop = this.handleDrop.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleUserNameInput = this.handleUserNameInput.bind(this);
  }

  handleDrop(city, position) {
    this.setState({
      selectedCities: Object.assign({}, this.state.selectedCities, {[position]: city})
    })
  }
  //modal methods
  openModal(e) {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleUserNameInput(ev) {
    this.setState({
      username: ev.target.value
    });
    console.log('username', this.state.username);
  }
  //end modal methods

  render() {
    const {left, right} = this.state.selectedCities;

    return (
    <div className="city-comparison-container">
      <div className="city-drop-zones">
        <button className="bubble-map-viz" onClick={this.openModal}>
        Bubble Chart
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
      <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >

            <h2 ref={subtitle => this.subtitle = subtitle}>Bubble Chart</h2>
            {this.props.cities.length && <UsDataOverview cities={this.props.cities}/>}
            <button onClick={this.closeModal}>close</button>
          </Modal>
    </div>
    )
  }
}

export default CityComparisonContainer;