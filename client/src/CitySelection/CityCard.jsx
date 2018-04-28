import React from "react";
import ReactDOM from "react-dom";
import { ItemTypes } from '../constants.js';
import { DragSource } from 'react-dnd';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#app');

const cardSource = {
  beginDrag(props) {
    console.log('city being dragged is', props.city.city_name_short);
    return props.city;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class CityCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    }

    this.stylePopulation = this.stylePopulation.bind(this);
    this.handleClick = this.handleClick.bind(this);


    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleUserNameInput = this.handleUserNameInput.bind(this);
  }


  //modal methods
  openModal(e) {
    this.setState({ modalIsOpen: true });

    this.handleClick(e);
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


  handleClick(e) {
    console.log('onclick', e.target.name);
    this.props.showDetails(e.target.name);
  }

  stylePopulation(population) {
    var reversed = population
      .toString()
      .split("")
      .reverse();
    for (var i = 3; i < reversed.length; i += 3) {
      reversed.splice(i++, 0, ",");
    }
    return reversed.reverse().join("");
  }

  render() {
    const { connectDragSource, isDragging } = this.props;
    const city = this.props.city;
    let style = {
      backgroundImage: `url(./images/${city.id}.jpg)`,
      width: 'auto',
      height: '33vh',
      backgroundPosition: "center",
      backgroundSize: "cover",
      position: "relative",
    }
    const popString = this.stylePopulation(city.population);

    return connectDragSource(
      <div
        className="cityPanel"
        value={city.city_name_long}
        style={style}
        onClick={() => this.props.handleClick(city)}
        key={city._id}
        >

        <div className="overlay">
            {/* <h2>
              {city.city_name_short}, {city.state}
            </h2> */}
        </div>
        <div className="info">
          <span className="city-name">{city.city_name_short}, {city.state}
          {/* <button name={city.city_name_short} onClick={this.handleClick} style={{ border: 'none', backgroundColor: 'transparent' }}> */}
          <button name={city.city_name_short} onClick={this.openModal} style={{ border: 'none', backgroundColor: 'transparent' }}>
          <img name={city.city_name_short} src={require('../../dist/images/Twitter_Social_Icon_Circle_Color.svg')} alt="My logo" width="16"/>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >

            <h2 ref={subtitle => this.subtitle = subtitle}>Hi There</h2>
            {this.props.twitterWC}
            <button onClick={this.closeModal}>close</button>
          </Modal>
          </button>
          </span>
        </div>

      </div>
    );
  }
};

export default DragSource(ItemTypes.CARD, cardSource, collect)(CityCard);