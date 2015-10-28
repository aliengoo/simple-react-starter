"use strict";

import AsyncStatus from '../../../shared/async-status';
import TodoApi from '../todo-api';

let todoApi = new TodoApi();

const UNCOMPLETE_TODO = "UNCOMPLETE_TODO";

function uncompleteTodoFetching(id) {
  return {
    type: UNCOMPLETE_TODO,
    id,
    _asyncStatus: AsyncStatus.FETCHING
  };
}

function uncompleteTodoComplete(id) {
  return {
    type: UNCOMPLETE_TODO,
    id,
    _asyncStatus: AsyncStatus.COMPLETE
  };
}

function uncompleteTodoFailed(err) {
  return {
    type: UNCOMPLETE_TODO,
    err: err.message,
    _asyncStatus: AsyncStatus.FAILED
  };
}

function uncompleteTodo(id) {
  return dispatch => {
    dispatch(uncompleteTodoFetching(id));
    return todoApi.uncomplete(id)
      .then(todo => dispatch(uncompleteTodoComplete(id)), (err) => uncompleteTodoFailed(err));
  };
}

export default {
  create: uncompleteTodo,
  type: UNCOMPLETE_TODO
};