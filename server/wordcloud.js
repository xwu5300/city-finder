var cloud = require("d3-cloud");
const Twitter = require('twitter');
const { consumer_key, consumer_secret, access_token_key, access_token_secret } = require('../config.js');

const client = new Twitter({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token_key: access_token_key,
  access_token_secret: access_token_secret
});

const getTweetTrends = (yahooId) => { //trends seem to similar across cities...maybe x-ref against worldwide?
  const params = {id: yahooId};
  console.log('about to try to make request to twitter');
  return client.get('trends/place.json?', params)
    .then(resp => {
      // console.log('response from twitter is', resp);
      // console.log('inside server, searching twitter for', resp[0].locations[0].name);
      const trendsAndVolume = resp[0].trends.reduce((trends, tweet) => {
        trends.push({
          text: tweet.name,
          size: adjustTweetVolume(tweet.tweet_volume) //default size when size is null
        });
        return trends;
      }, []);
      return trendsAndVolume;
    })
    .catch(err => {
      console.log('err from twitter call is', err);
    })
};

const adjustTweetVolume = (tweetVol) => {
  //return 10 if tweetVol is null, otherwise cap vol at 1000
  return !tweetVol ? 5 : tweetVol;
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