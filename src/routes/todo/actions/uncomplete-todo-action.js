"use strict";

import AsyncStatus from '../../../shared/async-status';
import {getSocket} from '../todo-socket-handler';
import Q from 'q';

var socket = getSocket();

const UNCOMPLETE_TODO = "UNCOMPLETE_TODO";

function fetching(id) {
  return {
    type: UNCOMPLETE_TODO,
    id,
    _asyncStatus: AsyncStatus.FETCHING
  };
}

function complete(id) {
  return {
    type: UNCOMPLETE_TODO,
    id,
    _asyncStatus: AsyncStatus.COMPLETE
  };
}

function failed(err) {
  return {
    type: UNCOMPLETE_TODO,
    err: err.message,
    _asyncStatus: AsyncStatus.FAILED
  };
}

function create(id) {

  return dispatch => {
    socket.emit(UNCOMPLETE_TODO, {
      id
    });

    socket.on(UNCOMPLETE_TODO, function (data) {
      if (data.err) {
        dispatch(failed(data.err));
      } else {
        dispatch(complete(data.todo));
      }
    });

    return Q.when(fetching());
  };
}


export default {
  create: create,
  type: UNCOMPLETE_TODO
};