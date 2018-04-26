const Twitter = require('twitter');
const { consumer_key, consumer_secret, access_token_key, access_token_secret } = require('../config.js');

//populate tweets in an array or in the DB or something
//periodically push those tweets to the frontend to create a word cloud

const client = new Twitter({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token_key: access_token_key,
  access_token_secret: access_token_secret
});

const params = {
  q: 'nyc', //will be city_short_name
  result_type: 'popular'
};

const getTweetWords = () => {
  return client.get('search/tweets.json?', params)
    .then(resp => {
      // console.log(resp.statuses);
      const wordsFromTweets = resp.statuses.reduce((wordsSoFar, tweet) => {
        const tweetWords = tweet.text.split(' '); //need to use regex to really split words
        return wordsSoFar.concat(tweetWords);
      }, []);
      return wordsFromTweets;
    })
    .catch(err => console.log(err))
};

exports.getTweetWords = getTweetWords;