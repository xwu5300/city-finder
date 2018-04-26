var Canvas = require("canvas");
var cloud = require("d3-cloud");
const Twitter = require('twitter');
const { consumer_key, consumer_secret, access_token_key, access_token_secret } = require('../config.js');

const client = new Twitter({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token_key: access_token_key,
  access_token_secret: access_token_secret
});

const params = { //CHANGE THIS LATER
  id: 2383660 //query DB for yahoo weather ID
};

const tweetVolumeAdjustment = 800;

const getTweetTrends = () => { //trends seem to similar across cities...maybe x-ref against worldwide?
  return client.get('trends/place.json?', params)
    .then(resp => {
      console.log(resp[0].locations[0].name);
      const trendsAndVolume = resp[0].trends.reduce((trends, tweet) => {
        trends.push({
          text: tweet.name,
          size: (tweet.tweet_volume || 8000) / tweetVolumeAdjustment //default size when size is null
        });
        return trends;
      }, []);
      return trendsAndVolume;
    })
    .catch(err => console.log(err))
};

const getCloud = () => {
  return getTweetTrends()
    .then(words => {
      return words;
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
  console.log('occurences are', occurences);
  return occurences;
}

exports.getCloud = getCloud;
exports.getTweetTrends = getTweetTrends;