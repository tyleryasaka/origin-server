require('dotenv').config()

var createApp = require('./app')
var http = require('http')

var app = createApp()
var port = process.env.PORT || '3000'
var server = http.createServer(app)

server.listen(port)