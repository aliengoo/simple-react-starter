"use strict";

var Users = require('./users');

module.exports = function (socket) {

  socket.on('disconnect', function () {
    Users.userDisconnected(socket.id, function () {
      socket.broadcast.emit("UserDisconnectedActionBroadcastAction", {
        data: socket.id
      });
    });
  });

  socket.on('SetUsernameAction', function (request, callback) {
    Users.setUsername(socket.id, request.data, function (err, connectedUser) {
      callback({
        err: err,
        data: connectedUser
      });

      if (!err) {
        socket.broadcast.emit("SetUsernameAction:broadcast", {
          data: connectedUser
        });
      }

    });
  });

  socket.on('SendMessageAction', function (request, callback) {

    var response = {
      data: {
        socketId: socket.id,
        message: request.data
      }
    };
    socket.broadcast.emit("SendMessageActionBroadcastAction", response);
    callback(response);
  });

  socket.on('GetUsersAction', function (request, callback) {

    Users.getUsers(function (err, users) {
      var response = {
        err: err,
        data: users
      };
      callback(response);
    });
  });

  socket.on('WhoAmIAction', function (request, callback) {
    Users.getUser(socket.id, function(err, connectedUser) {
      callback({
        err: err,
        data: connectedUser
      });
    });
  });
};