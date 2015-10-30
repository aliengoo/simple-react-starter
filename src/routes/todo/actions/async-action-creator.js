"use strict";

import Q from 'q';

import AsyncStatus from '../../../shared/async-status';
import {createHandlers} from '../../../shared/async-status-handlers';
import {getSocket} from '../todo-socket-handler';

var socket = getSocket();

export default function creator(type) {
  return function() {
    return {
      create: (data) => createEmit(type, data),
      type
    };
  }
}

function createEmit(type, data) {
  return dispatch => {

    const {fetching, complete, failed} = createHandlers(type);

    dispatch(fetching(data));

    var defer = Q.defer();

    socket.emit(type, data, (response) => {
      // both resolve, even if there is an error
      if (response.err) {
        defer.resolve(failed(response));
      } else {
        defer.resolve(complete(response));
      }
    });

    return defer.promise;
  };
}
