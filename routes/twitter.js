var express = require('express')
var router = express.Router()

module.exports = function() {
  router.get('/foo', function(req, res) {
    res.send('bar')
  })
  return router
}
