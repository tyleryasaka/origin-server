var express = require('express')
var bodyParser = require('body-parser')

var twitter = require('./routes/twitter')

module.exports = function() {
  var app = express()

  app.use(bodyParser.json())
  app.use('/api/twitter', twitter())

  app.use(function(err, req, res, next) {
    console.error('error', err)
    res.sendStatus(500)
  })

  return app
}
