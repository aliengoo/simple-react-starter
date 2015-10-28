"use strict";

import AsyncStatus from '../../../shared/async-status';
import ActionTypes from './todo-action-types';
import TodoApi from '../todo-api';

let todoApi = new TodoApi();

function completeTodoStart(id) {
  return {
    type: ActionTypes.COMPLETE_TODO,
    id,
    _asyncStatus: AsyncStatus.FETCHING
  };
}

function completeTodoEnd(id) {
  return {
    type: ActionTypes.COMPLETE_TODO,
    id,
    _asyncStatus: AsyncStatus.COMPLETE
  };
}

function completeTodoErr(err) {
  return {
    type: ActionTypes.COMPLETE_TODO,
    err: err.message,
    _asyncStatus: AsyncStatus.FAILED
  };
}

export function completeTodo(id) {
  return dispatch => {
    dispatch(completeTodoStart(id));
    return todoApi.complete(id)
      .then(todo => dispatch(completeTodoEnd(id)), (err) => completeTodoErr(err));
  };
}