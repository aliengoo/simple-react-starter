"use strict";

import Q from 'q';

import AsyncStatus from '../../../shared/async-status';
import {createHandlers} from '../../../shared/async-status-handlers';
import {getSocket} from '../../../shared/socket';


export default function creator(type) {
  return {
    create: (data) => createEmit(type, data),
    type
  };
}

/**
 * Emits the socket event with data
 * @param type - the type of action
 * @param data - the data.  The data is a property of the request passed to the socket, e.g. {data: data}
 * @returns {Function}
 */
function createEmit(type, data) {
  var socket = getSocket();

  return dispatch => {

    const {fetching, complete, failed} = createHandlers(type);

    dispatch(fetching(data));

    var defer = Q.defer();

    socket.emit(type, {
      data
    }, (response) => {
      // both resolve, even if there is an error
      if (response.err) {
        dispatch(failed(response.err));
      } else {
        dispatch(complete(response.data));
      }

      defer.resolve();
    });

    return defer.promise;
  };
}
