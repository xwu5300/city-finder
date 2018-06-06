var cloud = require("d3-cloud");
const Twitter = require('twitter');

const consumer_key = process.env.Consumer_key
const consumer_secret = process.env.Consumer_secret
const access_token_key = process.env.Access_token_key
const access_token_secret = process.env.Access_token_secret

const client = new Twitter({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token_key: access_token_key,
  access_token_secret: access_token_secret
});

//get US trending tweets and store in closure variable so it can be called once per user session
let USTrendingTweets = [];
client.get('trends/place.json?', {id: 23424977})
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
    USTrendingTweets = trendsAndVolume;
    return
  })
  .catch(err => {
    console.log('err from twitter call is', err);
  });


const getTweetTrends = (yahooId) => {
  // console.log('us trending tweets are', USTrendingTweets);
  const params = {id: yahooId};
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
      // console.log('local trends are', trendsAndVolume);
      // console.log('adjusted trends are', adjustTweetTrends(trendsAndVolume))
      return adjustTweetTrends(trendsAndVolume);
    })
    .catch(err => {
      console.log('err from twitter call is', err);
    })
};

const adjustTweetVolume = (tweetVol) => {
  //return 10 if tweetVol is null, otherwise cap vol at 1000
  return !tweetVol ? 5 : tweetVol;
};

const adjustTweetTrends = (trendsAndVolume) => {
  return trendsAndVolume.map(trend => {
    let adjustedSize = (USTrendingTweets.filter(usTrend => usTrend.text === trend.text).length) ? (
      trend.size
    ) : trend.size * 10000 - 1;
    if (adjustedSize > 50000) adjustedSize = 50000; //set max size of 50000
    return {
      text: trend.text,
      size: adjustedSize
    }
  });
};

const getCloud = () => {
  return getTweetTrends()
    .then(words => {
      return words;
    })
    .catch(err => console.log(err))
};

exports.getCloud = getCloud;
exports.getTweetTrends = getTweetTrends;