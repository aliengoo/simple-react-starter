"use strict";

import AsyncStatus from '../../../shared/async-status';
import TodoApi from '../todo-api';

const UPDATE_TODO_COMMIT = "UPDATE_TODO_COMMIT";
let todoApi = new TodoApi();

function updateTodoCommitFetching(todo) {
  return {
    type: UPDATE_TODO_COMMIT,
    _asyncStatus: AsyncStatus.FETCHING,
    todo
  };
}

function updateTodoCommitComplete(todo) {
  return {
    type: UPDATE_TODO_COMMIT,
    _asyncStatus: AsyncStatus.COMPLETE,
    todo
  };
}

function updateTodoCommitFailed(err) {
  return {
    type: UPDATE_TODO_COMMIT,
    err: err.message,
    _asyncStatus: AsyncStatus.FAILED
  };
}

function updateTodoCommit(todo) {
  return dispatch => {
    updateTodoCommitFetching(todo);
    return todoApi
      .save(todo)
      .then(
        updatedTodo => dispatch(updateTodoCommitComplete(updatedTodo)),
        err => dispatch(updateTodoCommitFailed(err)));
  };
}

export default {
  create: updateTodoCommit,
  type: UPDATE_TODO_COMMIT
};