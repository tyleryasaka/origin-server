var express = require('express')

var twitter = require('./routes/twitter')

module.exports = function() {
  var app = express()

  app.use('/api/twitter', twitter())

  return app
}
