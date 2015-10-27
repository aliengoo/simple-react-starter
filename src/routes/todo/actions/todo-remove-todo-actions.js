"use strict";

import ActionTypes from './todo-action-types';
import TodoApi from '../todo-api';

let todoApi = new TodoApi();

function removeTodoStart(id) {
  return {
    type: ActionTypes.REMOVE_TODO_STARTED,
    id
  };
}

function removeTodoEnd(id) {
  return {
    type: ActionTypes.REMOVE_TODO_ENDED,
    id
  };
}

function removeTodoErr(err) {
  return {
    type: ActionTypes.REMOVE_TODO_ERR,
    err: err.message
  };
}

export function removeTodo(id) {
  return dispatch => {
    dispatch(removeTodoStart(id));
    return todoApi.remove(id)
      .then(() => dispatch(removeTodoEnd(id)), (err) => removeTodoErr(err));
  };
}