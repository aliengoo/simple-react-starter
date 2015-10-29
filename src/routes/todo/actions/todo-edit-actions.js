"use strict";

import AsyncStatus from '../../../shared/async-status';

import TodoApi from '../todo-api';

let todoApi = new TodoApi();

const SAVE_TODO_EDIT = "SAVE_TODO_EDIT";

function saveTodoEditFetching(id) {
  return {
    type: SAVE_TODO_EDIT,
    _asyncStatus: AsyncStatus.FETCHING,
    id
  };
}

function saveTodoEditComplete(todo) {
  return {
    type: SAVE_TODO_EDIT,
    _asyncStatus: AsyncStatus.COMPLETE,
    todo
  };
}

function saveTodoEditFailed(err) {
  return {
    type: SAVE_TODO_EDIT,
    _asyncStatus: AsyncStatus.FAILED,
    err: err.message
  };
}



function abortTodoEditFetching(id) {
  return {
    type: ActionTypes.ABORT_TODO_EDIT,
    _asyncStatus: AsyncStatus.FETCHING,
    id
  };
}

function abortTodoEditComplete(todo) {
  return {
    type: ActionTypes.ABORT_TODO_EDIT,
    _asyncStatus: AsyncStatus.COMPLETE,
    todo
  };
}

function abortTodoEditFailed(err) {
  return {
    type: ActionTypes.ABORT_TODO_EDIT,
    _asyncStatus: AsyncStatus.FAILED,
    err: err.message
  };
}

export function abortTodoEdit(id) {
  return dispatcher => {
    abortTodoEditFetching(id);
    todoApi.save(todo).then(
      (originalTodo) => dispatcher(abortTodoEditComplete(originalTodo)),
      (err) => dispatcher(abortTodoEditFailed(err)));
  };
}

export function saveTodoEdit(todo) {
  return dispatcher => {
    saveTodoEditFetching(todo._id);
    todoApi.save(todo).then(
      (updatedTodo) => dispatcher(saveTodoEditComplete(updatedTodo)),
      (err) => dispatcher(saveTodoEditFailed(err)));
  };
}

export function startTodoEdit(id) {
  return {
    type: ActionTypes.START_TODO_EDIT,
    id
  };
}