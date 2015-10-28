"use strict";

import AsyncStatus from '../../../shared/async-status';
import ActionTypes from './todo-action-types';
import TodoApi from '../todo-api';

let todoApi = new TodoApi();

function completeTodoFetching(id) {
  return {
    type: ActionTypes.COMPLETE_TODO,
    id,
    _asyncStatus: AsyncStatus.FETCHING
  };
}

function completeTodoCompleted(id) {
  return {
    type: ActionTypes.COMPLETE_TODO,
    id,
    _asyncStatus: AsyncStatus.COMPLETE
  };
}

function completeTodoFailed(err) {
  return {
    type: ActionTypes.COMPLETE_TODO,
    err: err.message,
    _asyncStatus: AsyncStatus.FAILED
  };
}

export function completeTodo(id) {
  return dispatch => {
    dispatch(completeTodoFetching(id));
    return todoApi.complete(id)
      .then(todo => dispatch(completeTodoCompleted(id)), (err) => completeTodoFailed(err));
  };
}