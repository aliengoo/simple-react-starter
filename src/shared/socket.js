"use strict";

import io from 'socket.io-client';

let socket = io.connect("http://localhost:3000");



export function getSocket() {
  return socket;
}