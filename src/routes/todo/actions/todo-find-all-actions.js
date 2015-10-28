"use strict";

import AsyncStatus from '../../../shared/async-status';
import ActionTypes from './todo-action-types';
import TodoApi from '../todo-api';
import todoStore from '../store/todo-store';

let todoApi = new TodoApi();

function findAllTodosFetching() {
  return {
    type: ActionTypes.FIND_ALL_TODOS,
    _asyncStatus: AsyncStatus.FETCHING
  };
}

function findAllTodosComplete(todos) {
  return {
    type: ActionTypes.FIND_ALL_TODOS,
    todos,
    _asyncStatus: AsyncStatus.COMPLETE
  };
}

function findAllTodosFailed(err) {
  return {
    type: ActionTypes.FIND_ALL_TODOS,
    err: err.message,
    _asyncStatus: AsyncStatus.FAILED
  };
}

export function findAllTodos() {
  return dispatch => {
    dispatch(findAllTodosFetching());
    return todoApi.findAll()
      .then(todos => dispatch(findAllTodosComplete(todos)), (err) => findAllTodosFailed(err));
  };
}
