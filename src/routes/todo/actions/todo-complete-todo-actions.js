"use strict";

import ActionTypes from './todo-action-types';
import TodoApi from '../todo-api';

let todoApi = new TodoApi();

function completeTodoStart(id) {
  return {
    type: ActionTypes.COMPLETE_TODO_STARTED,
    id
  };
}

function completeTodoEnd(id) {
  return {
    type: ActionTypes.COMPLETE_TODO_ENDED,
    id
  };
}

function completeTodoErr(err) {
  return {
    type: ActionTypes.COMPLETE_TODO_ERR,
    err: err.message
  };
}

export function completeTodo(id) {
  return dispatch => {
    dispatch(completeTodoStart(id));
    return todoApi.complete(id)
      .then(todo => dispatch(completeTodoEnd(id)), (err) => completeTodoErr(err));
  };
}