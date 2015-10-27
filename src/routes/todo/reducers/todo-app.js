"use strict";

import ActionTypes from '../actions/todo-action-types';
import _ from 'lodash';
import { combineReducers } from 'redux';

// acts on the inProgress part of state
function inProgress(state = false, action) {
  switch (action.type) {
    case ActionTypes.ADD_TODO_STARTED:
    case ActionTypes.COMPLETE_TODO_STARTED:
    case ActionTypes.FIND_ALL_TODOS_STARTED:
      return true;
      break;
    case ActionTypes.ADD_TODO_ENDED:
    case ActionTypes.COMPLETE_TODO_ENDED:
    case ActionTypes.FIND_ALL_TODOS_ENDED:
      return false;
      break;
  }

  return state;
}

function completingId(state = "", action) {

  switch (action.type) {
    case ActionTypes.COMPLETE_TODO_STARTED:
      console.log(action);
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
  switch (action.type) {
    case ActionTypes.ADD_TODO_ERR:
    case ActionTypes.COMPLETE_TODO_ERR:
    case ActionTypes.FIND_ALL_TODOS_ERR:
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

      var indexOfTodo = _.findIndex(state, (item) => item._id === action.id);

      return [
          ...state.slice(0, indexOfTodo),
          Object.assign({}, state[indexOfTodo], {
            completed: true
          }),
          ...state.slice(indexOfTodo + 1)
        ];
    case ActionTypes.FIND_ALL_TODOS_ENDED:
      var key = 0;

      _.forEach(action.todos, (t) => t.key = ++key);

      return action.todos;
    default:
      return state;
  }
}

const todoApp = combineReducers({
  inProgress,
  completingId,
  err,
  todos
});

export default todoApp