"use strict";

import AsyncStatus from '../../../shared/async-status';
import TodoApi from '../todo-api';

const UPDATE_TODO_COMMIT = "UPDATE_TODO_COMMIT";
let todoApi = new TodoApi();

function updateTodoCommitFetching(todoBeingEdited) {
  return {
    type: UPDATE_TODO_COMMIT,
    _asyncStatus: AsyncStatus.FETCHING,
    todoBeingEdited
  };
}

function updateTodoCommitComplete(updatedTodo) {
  return {
    type: UPDATE_TODO_COMMIT,
    _asyncStatus: AsyncStatus.COMPLETE,
    updatedTodo
  };
}

function updateTodoCommitFailed(err) {
  return {
    type: UPDATE_TODO_COMMIT,
    err: err.message,
    _asyncStatus: AsyncStatus.FAILED
  };
}

function updateTodoCommit(todoBeingEdited) {
  return dispatch => {
    updateTodoCommitFetching(todoBeingEdited);
    return todoApi
      .save(todoBeingEdited)
      .then(
        updatedTodo => dispatch(updateTodoCommitComplete(updatedTodo)),
        err => dispatch(updateTodoCommitFailed(err)));
  };
}

export default {
  create: updateTodoCommit,
  type: UPDATE_TODO_COMMIT
};