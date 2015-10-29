"use strict";

import AsyncStatus from '../../../shared/async-status';
import TodoApi from '../todo-api';
import todoStore from '../store/todo-store';

let todoApi = new TodoApi();

const FIND_ALL_TODOS = "FIND_ALL_TODOS";

function findAllTodosFetching() {
  return {
    type: FIND_ALL_TODOS,
    _asyncStatus: AsyncStatus.FETCHING
  };
}

function findAllTodosComplete(todos) {
  return {
    type: FIND_ALL_TODOS,
    todos,
    _asyncStatus: AsyncStatus.COMPLETE
  };
}

function findAllTodosFailed(err) {
  return {
    type: FIND_ALL_TODOS,
    err: err.message,
    _asyncStatus: AsyncStatus.FAILED
  };
}

function findAllTodos() {
  return dispatch => {
    dispatch(findAllTodosFetching());
    return todoApi.findAll()
      .then(todos => dispatch(findAllTodosComplete(todos)), (err) => findAllTodosFailed(err));
  };
}

export default {
  findAllTodos: findAllTodos,
  type: FIND_ALL_TODOS
};
