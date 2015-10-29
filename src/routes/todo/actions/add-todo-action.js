"use strict";

import AsyncStatus from '../../../shared/async-status';
import TodoApi from '../todo-api';

let todoApi = new TodoApi();

const ADD_TODO = "ADD_TODO";

function addTodoStart() {
  return {
    type: ADD_TODO,
    _asyncStatus: AsyncStatus.FETCHING
  };
}

function addTodoEnd(todo) {
  return {
    type: ADD_TODO,
    todo,
    _asyncStatus: AsyncStatus.COMPLETE
  };
}

function addTodoErr(err) {
  return {
    type: ADD_TODO,
    err: err.message,
    _asyncStatus: AsyncStatus.FAILED
  };
}

function addTodo(text) {
  return dispatch => {
    dispatch(addTodoStart());
    return todoApi.save({
        text: text
      })
      .then(todo => dispatch(addTodoEnd(todo)), (err) => addTodoErr(err));
  };
}

export default {
  create: addTodo,
  type: ADD_TODO
};