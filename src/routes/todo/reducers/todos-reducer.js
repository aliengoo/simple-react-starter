"use strict";

import AsyncStatus from '../../../shared/async-status';

import AddTodoAction from '../actions/add-todo-action';
import CompleteTodoAction from '../actions/complete-todo-action';
import UncompleteTodoAction from '../actions/uncomplete-todo-action';
import RemoveTodoAction from '../actions/remove-todo-action';
import FindAllTodosAction from '../actions/find-all-todos-action';
import UpdateTodoStartedAction from '../actions/update-todo-started-action';
import UpdateTodoCommitAction from '../actions/update-todo-commit-action';
import UpdateTodoAbortedAction from '../actions/update-todo-aborted-action';

import _ from 'lodash';

function addTodoReducer(todos, action) {
  if (action._asyncStatus === AsyncStatus.COMPLETE) {
    return [action.todo, ...todos];
  }

  return todos;
}

function completeTodoReducer(todos, action) {

  if (action._asyncStatus === AsyncStatus.COMPLETE) {
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

function uncompleteTodoReducer(todos, action) {
  if (action._asyncStatus === AsyncStatus.COMPLETE) {
    let indexOfTodo = _.findIndex(todos, (item) => item._id === action.id);

    return [
      ...todos.slice(0, indexOfTodo),
      Object.assign({}, todos[indexOfTodo], {
        completed: false
      }),
      ...todos.slice(indexOfTodo + 1)
    ];
  }

  return todos;
}


function removeTodoReducer(todos, action) {

  if (action._asyncStatus === AsyncStatus.COMPLETE) {
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

function updateTodoCommitReducer(todos = [], action) {

  if (action._asyncStatus === AsyncStatus.COMPLETE) {
    let indexOfTodo = _.findIndex(todos, (item) => item._id === action.updatedTodo._id);

    return [
      ...todos.slice(0, indexOfTodo),
      action.updatedTodo,
      ...todos.slice(indexOfTodo + 1)
    ];
  }

  return todos;
}

function updateTodoAbortReducer(todos = [], action) {
  if (action._asyncStatus === AsyncStatus.COMPLETE) {
    let indexOfTodo = _.findIndex(todos, (item) => item._id === action.todoBeingEditedPriorState._id);

    return [
      ...todos.slice(0, indexOfTodo),
      action.todoBeingEditedPriorState,
      ...todos.slice(indexOfTodo + 1)
    ];
  }

  return todos;
}

/**
 *
 * @param todos - the todos part of the app state
 * @param action - the action
 * @returns {Array}
 */
export default function todos(todos = [], action) {

  if (action._asyncStatus !== AsyncStatus.COMPLETE) {
    return todos;
  }

  switch (action.type) {
    case AddTodoAction.type:
      return addTodoReducer(todos, action);
    case CompleteTodoAction.type:
      return completeTodoReducer(todos, action);
    case UncompleteTodoAction.type:
      return uncompleteTodoReducer(todos, action);
    case RemoveTodoAction.type:
      return removeTodoReducer(todos, action);
    case FindAllTodosAction.type:
      return findAllTodosReducer(todos, action);
    case UpdateTodoCommitAction.type:
      return updateTodoCommitReducer(todos, action);
    case UpdateTodoAbortedAction.type:
      return updateTodoAbortReducer(todos, action);
      break;
    default:
      return todos;
  }
}
