"use strict";

import AsyncStatus from '../../../shared/async-status';
import {getSocket} from '../todo-socket-handler';
import Q from 'q';

var socket = getSocket();

const ADD_TODO = "ADD_TODO";

function fetching() {
  return {
    type: ADD_TODO,
    _asyncStatus: AsyncStatus.FETCHING
  };
}

function complete(todo) {
  return {
    type: ADD_TODO,
    todo,
    _asyncStatus: AsyncStatus.COMPLETE
  };
}

function failed(err) {
  return {
    type: ADD_TODO,
    err: err.message,
    _asyncStatus: AsyncStatus.FAILED
  };
}

function create(text) {

  return dispatch => {

    var defer = Q.defer();

    socket.emit(ADD_TODO, {
      todo: {
        text: text
      }
    });

    socket.on(ADD_TODO, function (data) {
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
  type: ADD_TODO
};