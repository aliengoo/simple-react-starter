"use strict";

import AsyncStatus from '../../../shared/async-status';
import ActionTypes from './todo-action-types';
import TodoApi from '../todo-api';

let todoApi = new TodoApi();

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
  return dispatch => {
    dispatch(completeTodoFetching(id));
    return todoApi.complete(id)
      .then(todo => dispatch(completeTodoCompleted(id)), (err) => completeTodoFailed(err));
  };
}

export default {
  create: completeTodo,
  type: COMPLETE_TODO
};