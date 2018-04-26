var Canvas = require("canvas");
var cloud = require("d3-cloud");
const twitter = require('./twitter.js');

const getCloud = () => {
  return twitter.getTweetWords()
    .then(words => {
      const occurences = countOccurences(words);
      return words.map(function(d) {
        console.log({text: d, size: 10 * occurences[d]})
        return {text: d, size: 10 * occurences[d]};
      });
    })
    .catch(err => console.log(err))
};

//BUG: same phrase seems to show up separate times
const countOccurences = (words) => { //filter out meaningless words
  let occurences = {};
  words.forEach(word => {
    if (occurences.hasOwnProperty(word)) {
      occurences[word]++;
    } else {
      occurences[word] = 1;
    }
  })
  return occurences;
}
exports.getCloud = getCloud;