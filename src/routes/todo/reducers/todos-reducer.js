"use strict";

import ActionStatus from '../../../shared/async-status';
import ActionTypes from '../actions/todo-action-types';
import _ from 'lodash';

function addTodoReducer(todos, action) {
  if (action._asyncStatus === ActionStatus.COMPLETE) {
    return [action.todo, ...todos];
  }

  return todos;
}

function completeTodoReducer(todos, action) {

  if (action._asyncStatus === ActionStatus.COMPLETE) {
    let indexOfTodo = _.findIndex(todos, (item) => item._id === action.id);

    return [
      ...todos.slice(0, indexOfTodo),
      Object.assign({}, todos[indexOfTodo], {
        completed: true
      }),
      ...todos.slice(indexOfTodo + 1)
    ];
  }

  return todos;
}

function removeTodoReducer(todos, action) {

  if (action._asyncStatus === ActionStatus.COMPLETE) {
    let indexOfTodo = _.findIndex(todos, (item) => item._id === action.id);

    return [
      ...todos.slice(0, indexOfTodo),
      ...todos.slice(indexOfTodo + 1)
    ];
  }

  return todos;
}

function findAllTodosReducer(todos = [], action) {
  return action.todos || todos;
}

/**
 *
 * @param todos - the todos part of the app state
 * @param action - the action
 * @returns {Array}
 */
export default function todos(todos = [], action) {

  if (action._asyncCompleted === false) {
    return todos;
  }

  switch(action.type) {
    case ActionTypes.ADD_TODO:
      return addTodoReducer(todos, action);
    case ActionTypes.COMPLETE_TODO:
      return completeTodoReducer(todos, action);
    case ActionTypes.REMOVE_TODO:
      return removeTodoReducer(todos, action);
    case ActionTypes.FIND_ALL_TODOS:
      return findAllTodosReducer(todos, action);
    default:
      return todos;
  }
}
