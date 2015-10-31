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
    });
  });

  socket.on('SendMessageAction', function (request, callback) {

    var response = {
      data: {
        username: socket.id,
        message: request.data
      }
    };
    socket.broadcast.emit("SendMessageActionBroadcastAction", response);
    callback(response);
  });

  socket.on('GetUsernamesAction', function (request, callback) {

    Users.getAllUsers(function (err, socketIds) {
      var response = {
        err: err,
        data: socketIds
      };
      callback(response);
    });
  });

  socket.on('WhoAmIAction', function (request, callback) {
    callback({
      data: socket.id
    });
  });
};