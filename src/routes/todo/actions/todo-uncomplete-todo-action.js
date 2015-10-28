"use strict";

import AsyncStatus from '../../../shared/async-status';
import ActionTypes from './todo-action-types';
import TodoApi from '../todo-api';

let todoApi = new TodoApi();

function uncompleteTodoFetching(id) {
  return {
    type: ActionTypes.UNCOMPLETE_TODO,
    id,
    _asyncStatus: AsyncStatus.FETCHING
  };
}

function uncompleteTodoComplete(id) {
  return {
    type: ActionTypes.UNCOMPLETE_TODO,
    id,
    _asyncStatus: AsyncStatus.COMPLETE
  };
}

function uncompleteTodoFailed(err) {
  return {
    type: ActionTypes.UNCOMPLETE_TODO,
    err: err.message,
    _asyncStatus: AsyncStatus.FAILED
  };
}

export function uncompleteTodo(id) {
  return dispatch => {
    dispatch(uncompleteTodoFetching(id));
    return todoApi.uncomplete(id)
      .then(todo => dispatch(uncompleteTodoComplete(id)), (err) => uncompleteTodoFailed(err));
  };
}