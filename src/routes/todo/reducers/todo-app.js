"use strict";

import ActionTypes from '../actions/todo-action-types';
import _ from 'lodash';
import { combineReducers } from 'redux';

function newItemText(state = "", action) {
  if (action.type.endsWith("_ENDED")) {
    return "";
  }

  return action.text || state;
}

// acts on the inProgress part of state
function inProgress(state = false, action) {
  if (action.type.endsWith("_STARTED")) {
    return true;
  } else if (action.type.endsWith("_ENDED") || action.type.endsWith("_ERR")) {
    return false;
  }

  return state;
}

function completingId(state = "", action) {

  switch (action.type) {
    case ActionTypes.COMPLETE_TODO_STARTED:
      return action.id;
      break;
    case ActionTypes.COMPLETE_TODO_ERR:
    case ActionTypes.COMPLETE_TODO_ENDED:
      return "";
      break;
  }

  return state;
}

function err(state = "", action) {

  if (action.type.endsWith("_ERR")) {
    return action.err;
  }

  return state;
}

// acts on the todos part of state
function todos(state = [], action) {

  switch (action.type) {
    case ActionTypes.ADD_TODO_ENDED:
      return [action.todo, ...state];
    case ActionTypes.COMPLETE_TODO_ENDED:

      let i1 = _.findIndex(state, (item) => item._id === action.id);

      return [
        ...state.slice(0, i1),
        Object.assign({}, state[i1], {
          completed: true
        }),
        ...state.slice(i1 + 1)
      ];
    case ActionTypes.REMOVE_TODO_ENDED:
      let i2 = _.findIndex(state, (item) => item._id === action.id);
      return [
        ...state.slice(0, i2),
        ...state.slice(i2 + 1)
      ];
    case ActionTypes.FIND_ALL_TODOS_ENDED:
      return action.todos;
    default:
      return state;
  }
}

const todoApp = combineReducers({
  newItemText,
  inProgress,
  completingId,
  err,
  todos
});

export default todoApp;