"use strict";

import io from 'socket.io-client';

let socket = io.connect("http://localhost:3000");

let sessionId;

socket.on('connect', function (x) {
  sessionId = socket.id;
});

export function getSocket() {
  return socket;
}

export function getSessionId() {
  return sessionId;
}