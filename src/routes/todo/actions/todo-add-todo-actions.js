"use strict";

import AsyncStatus from '../../../shared/async-status';
import ActionTypes from './todo-action-types';
import TodoApi from '../todo-api';

let todoApi = new TodoApi();

function addTodoStart() {
  return {
    type: ActionTypes.ADD_TODO,
    _asyncStatus: AsyncStatus.FETCHING
  };
}

function addTodoEnd(todo) {
  return {
    type: ActionTypes.ADD_TODO,
    todo,
    _asyncStatus: AsyncStatus.COMPLETE
  };
}

function addTodoErr(err) {
  return {
    type: ActionTypes.ADD_TODO,
    err: err.message,
    _asyncStatus: AsyncStatus.FAILED
  };
}

export function addTodo(text) {
  return dispatch => {
    dispatch(addTodoStart());
    return todoApi.save({
        text: text
      })
      .then(todo => dispatch(addTodoEnd(todo)), (err) => addTodoErr(err));
  };
}
