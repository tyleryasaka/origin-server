var express = require('express')
var Twitter = require('twitter')
var request = require('request')

var router = express.Router()

const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET

const encoded_secret = new Buffer(TWITTER_CONSUMER_KEY + ':' + TWITTER_CONSUMER_SECRET).toString('base64')

const twitterAuthOptions = {
    url: 'https://api.twitter.com/oauth2/token',
    headers: {
      'Authorization': `Basic ${encoded_secret}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: 'grant_type=client_credentials'
}

module.exports = function() {
  // Get oAuth bearer token for application-only authentication (see https://developer.twitter.com/en/docs/basics/authentication/overview/application-only)
  request.post(twitterAuthOptions, function(error, response, body) {
    let bearerToken = JSON.parse(body).access_token
    let appOnlyClient = new Twitter({
      consumer_key: TWITTER_CONSUMER_KEY,
      consumer_secret: TWITTER_CONSUMER_SECRET,
      bearer_token: bearerToken
    })

    router.get('/statuses/show/:id', function(req, res, next) {
      let { id } = req.params
      appOnlyClient.get(`statuses/show/${id}`, {})
      .then(function (tweet) {
        res.send(tweet.text)
      })
      .catch(function (error) {
        next(error)
      })
    })
  })

  router.post('/statuses/update', function(req, res, next) {
    let { accessTokenKey, accessTokenSecret, status } = req.body
    let client = new Twitter({
      consumer_key: TWITTER_CONSUMER_KEY,
      consumer_secret: TWITTER_CONSUMER_SECRET,
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
