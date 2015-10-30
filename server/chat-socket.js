"use strict";

module.exports = function (socket) {

  socket.on('disconnect', function () {
    socket.broadcast.emit("UserDisconnectedActionBroadcastAction", {
      data: socket.id
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
};