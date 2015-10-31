"use strict";

var _ = require('lodash');
var mongoose = require("mongoose");

var ConnectedUser = mongoose.model("ConnectedUser", {
  socketId: String,
  name: String
});

module.exports.userConnected = function (id, callback) {
  var connectedUser = new ConnectedUser({
    socketId: id
  });

  connectedUser.save(function (err) {
    callback(err, connectedUser);
  });
};

module.exports.userDisconnected = function (id, callback) {
  ConnectedUser.remove({
    socketId: id
  }, callback);
};

module.exports.setUsername = function (socketId, name, callback) {
  ConnectedUser.update({
    socketId: socketId
  }, {
    $set: {
      name: name
    }
  }, {
    'new': true
  }, callback);

};

module.exports.getAllUsers = function (callback) {
  ConnectedUser.find({}, function (err, connectedUsers) {
    if (err) {
      callback(err);
    } else {
      callback(undefined, connectedUsers);
    }
  });
};

module.exports.clearAll = function (callback) {
  ConnectedUser.remove({}, callback);
};