import React from 'react';
import axios from 'axios';
import WordCloud from 'react-d3-cloud';

const fontSizeMapper = (word) => Math.log2(word.value) * 5;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const rotate = (word) => {
  if (word.value === 5) { //default value given if twitter gives a null weight
    return getRandomInt(0, 90);
  }
  else return word.value % 90;
};

const wordsArrsEqual = (wordArr1, wordArr2) => {
  if (wordArr1.length !== wordArr2.length) return false;
  for (let i = 0; i < wordArr1.length; i++) {
    if (wordArr1[i].text !== wordArr2[i].text || wordArr1[i].value !== wordArr2[i].value) {
      return false;
    }
  }
  return true;
}

class TwitterWordCloud extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    if (wordsArrsEqual(this.props.words, nextProps.words)) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    console.log('state at this render is', this.props.words)
    return (
    <div>
      WORD CLOUD
      <WordCloud
          data={this.props.words}
          fontSizeMapper={fontSizeMapper}
          rotate={rotate}
        />
    </div>
    )
  }
}

export default TwitterWordCloud;