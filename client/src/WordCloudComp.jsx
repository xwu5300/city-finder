import React from 'react';
// import * as d3 from 'd3';
// import Cloud from 'd3-cloud';
import axios from 'axios';
import WordCloud from 'react-d3-cloud';

const fontSizeMapper = (word) => Math.log2(word.value) * 5;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const rotate = (word) => {
  if (word.value === 5) {
    return getRandomInt(0, 90);
  }
  else return word.value % 90;
};

class WordCloudComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frequency_list: ''
    }
  }

  componentDidMount() {
    const params = {
      cityName: 'Cleveland' //matches city_name_short from city props
    }
    axios.get('/twitter', {params: params})
      .then(resp => {
        const frequency_list = resp.data.map(word => {
          word.value = word.size;
          return word
        });
        this.setState({
          frequency_list: frequency_list
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
    <div>
      WORD CLOUD
      {this.state.frequency_list ? (
        <WordCloud
          data={this.state.frequency_list}
          fontSizeMapper={fontSizeMapper}
          rotate={rotate}
        />
      ) : <span></span>}
    </div>
    )
  }
}

export default WordCloudComp;