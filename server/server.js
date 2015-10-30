"use strict";

var express = require("express")
  , bodyParser = require('body-parser')
  , cors = require('cors'),
  delay = require('express-delay');


var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


//app.use(delay(1000));
app.use(bodyParser.json());
app.use(cors());

var socketHandler = require('./socket-handler');

socketHandler(io);

server.listen(3000, function () {
  console.log("Server listening on port 3000...");
});
