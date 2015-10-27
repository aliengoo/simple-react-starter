"use strict";

import ActionTypes from './todo-action-types';
import TodoApi from '../todo-api';
import todoStore from '../store/todo-store';

let todoApi = new TodoApi();

function findAllTodosStart() {
  return {
    type: ActionTypes.FIND_ALL_TODOS_STARTED
  };
}

function findAllTodosEnd(todos) {
  return {
    type: ActionTypes.FIND_ALL_TODOS_ENDED,
    todos
  };
}

function findAllTodosErr(err) {
  return {
    type: ActionTypes.FIND_ALL_TODOS_ERR,
    err: err.message
  };
}

export function findAllTodos() {
  return dispatch => {
    dispatch(findAllTodosStart());
    return todoApi.findAll()
      .then(todos => dispatch(findAllTodosEnd(todos)), (err) => findAllTodosErr(err));
  };
}

