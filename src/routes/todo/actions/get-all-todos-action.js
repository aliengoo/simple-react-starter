"use strict";

import AsyncStatus from '../../../shared/async-status';
import TodoApi from '../todo-api';
import {getSocket} from '../todo-socket-handler';

let socket = getSocket();

socket.on('getAllTodos:result', function(data) {
  if (data.err) {
    getAllTodosFailed(data.err);
  } else {
    getAllTodosComplete(data.todos);
  }
});

const GET_ALL_TODOS = "GET_ALL_TODOS";

function getAllTodosFetching() {
  return {
    type: GET_ALL_TODOS,
    _asyncStatus: AsyncStatus.FETCHING
  };
}

function getAllTodosComplete(todos) {
  return {
    type: GET_ALL_TODOS,
    todos,
    _asyncStatus: AsyncStatus.COMPLETE
  };
}

function getAllTodosFailed(err) {
  return {
    type: GET_ALL_TODOS,
    err: err.message,
    _asyncStatus: AsyncStatus.FAILED
  };
}

function getAllTodos() {
  getAllTodosFetching();
  socket.emit('getAllTodos', {});
}

export default {
  create: getAllTodos,
  type: GET_ALL_TODOS
};
