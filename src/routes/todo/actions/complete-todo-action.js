"use strict";

import AsyncStatus from '../../../shared/async-status';
import {getSocket} from '../todo-socket-handler';

var socket = getSocket();

socket.on('completeTodo:result', function (data) {
  if (data.err) {
    completeTodoFailed(data.err);
  } else {
    completeTodoCompleted(data.todo);
  }
});

const COMPLETE_TODO = "COMPLETE_TODO";

function completeTodoFetching(id) {
  return {
    type: COMPLETE_TODO,
    id,
    _asyncStatus: AsyncStatus.FETCHING
  };
}

function completeTodoCompleted(id) {
  return {
    type: COMPLETE_TODO,
    id,
    _asyncStatus: AsyncStatus.COMPLETE
  };
}

function completeTodoFailed(err) {
  return {
    type: COMPLETE_TODO,
    err: err.message,
    _asyncStatus: AsyncStatus.FAILED
  };
}

function completeTodo(id) {


  socket.emit('completeTodo', {
    id: id
  });
  return completeTodoFetching(id);


}

export default {
  create: completeTodo,
  type: COMPLETE_TODO
};