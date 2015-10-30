"use strict";

import io from 'socket.io-client';

let socket = io.connect();

export function getSocket() {
  return socket;
}