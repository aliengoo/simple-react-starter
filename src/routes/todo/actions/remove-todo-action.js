"use strict";

import AsyncStatus from '../../../shared/async-status';
import ActionTypes from './todo-action-types';
import TodoApi from '../todo-api';

let todoApi = new TodoApi();

const REMOVE_TODO = "REMOVE_TODO";

function removeTodoStart(id) {
  return {
    type: REMOVE_TODO,
    id,
    _asyncStatus: AsyncStatus.FETCHING
  };
}

function removeTodoEnd(id) {
  return {
    type: REMOVE_TODO,
    id,
    _asyncStatus: AsyncStatus.COMPLETE
  };
}

function removeTodoErr(err) {
  return {
    type: REMOVE_TODO,
    err: err.message,
    _asyncStatus: AsyncStatus.FAILED
  };
}

function removeTodo(id) {
  return dispatch => {
    dispatch(removeTodoStart(id));
    return todoApi.remove(id)
      .then(() => dispatch(removeTodoEnd(id)), (err) => removeTodoErr(err));
  };
}

export default {
  create: removeTodo,
  type: REMOVE_TODO
};
