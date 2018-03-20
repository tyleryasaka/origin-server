var express = require('express')
var router = express.Router()
var Twitter = require('twitter')

module.exports = function() {
  router.post('/statuses/update', function(req, res, next) {
    let { accessTokenKey, accessTokenSecret, status } = req.body
    let client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: accessTokenKey,
      access_token_secret: accessTokenSecret
    })
    client.post('statuses/update', { status })
    .then(function (tweet) {
      res.send(tweet.id_str)
    })
    .catch(function (error) {
      next(error)
    })
  })
  return router
}
