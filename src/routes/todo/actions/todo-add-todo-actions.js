"use strict";

import ActionTypes from './todo-action-types';
import TodoApi from '../todo-api';
import todoStore from '../store/todo-store';

let todoApi = new TodoApi();

function addTodoStart() {
  return {
    type: ActionTypes.ADD_TODO_STARTED
  };
}

function addTodoEnd(todo) {
  return {
    type: ActionTypes.ADD_TODO_ENDED,
    todo
  };
}

function addTodoErr(err) {
  return {
    type: ActionTypes.ADD_TODO_ERR,
    err: err.message
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
