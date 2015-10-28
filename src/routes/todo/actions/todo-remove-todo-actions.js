"use strict";

import AsyncStatus from '../../../shared/async-status';
import ActionTypes from './todo-action-types';
import TodoApi from '../todo-api';

let todoApi = new TodoApi();

function removeTodoStart(id) {
  return {
    type: ActionTypes.REMOVE_TODO,
    id,
    _asyncStatus: AsyncStatus.FETCHING
  };
}

function removeTodoEnd(id) {
  return {
    type: ActionTypes.REMOVE_TODO,
    id,
    _asyncStatus: AsyncStatus.COMPLETE
  };
}

function removeTodoErr(err) {
  return {
    type: ActionTypes.REMOVE_TODO,
    err: err.message,
    _asyncStatus: AsyncStatus.FAILED
  };
}

export function removeTodo(id) {
  return dispatch => {
    dispatch(removeTodoStart(id));
    return todoApi.remove(id)
      .then(() => dispatch(removeTodoEnd(id)), (err) => removeTodoErr(err));
  };
}
