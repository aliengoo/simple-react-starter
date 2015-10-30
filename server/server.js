"use strict";

var express = require("express")
  , bodyParser = require('body-parser')
  , cors = require('cors');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("../wwwroot"));
app.use(bodyParser.json());
app.use(cors());

var todoSocket = require('./todo-socket');
var chatSocket = require('./chat-socket');

io.sockets.on('connection', function (socket) {
  todoSocket(socket);
  chatSocket(socket);

  socket.broadcast.emit("UserConnectedActionBroadcastAction", {
    data: socket.id
  });
});

server.listen(3000, function () {
  console.log("Server listening on port 3000...");
});
