"use strict";

import AsyncStatus from '../../../shared/async-status';
import AsyncActions from '../actions/async-actions';
import SyncActions from '../actions/sync-actions';
import BroadcastActions from '../actions/broadcast-actions';

import _ from 'lodash';

const {
  AddTodoAction,
  CompleteTodoAction,
  UncompleteTodoAction,
  RemoveTodoAction,
  UpdateTodoCommitAction,
  GetAllTodosAction
  } = AsyncActions;

const {
  UpdateTodoAbortedAction,
  } = SyncActions;

const {
  AddTodoActionBroadcastAction,
  UpdateTodoCommitActionBroadcastAction,
  RemoveTodoActionBroadcastAction
  } = BroadcastActions;

function addTodoActionReducer(todos, action) {
  return action._asyncStatus === AsyncStatus.COMPLETE ? [action.todo, ...todos] : todos;
}

function completeTodoActionReducer(todos, action) {

  if (action._asyncStatus === AsyncStatus.COMPLETE) {
    let indexOfTodo = _.findIndex(todos, (item) => item._id === action.data);

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

function uncompleteTodoActionReducer(todos, action) {
  if (action._asyncStatus === AsyncStatus.COMPLETE) {
    let indexOfTodo = _.findIndex(todos, (item) => item._id === action.data);

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


function removeTodoActionReducer(todos, action) {
  return action._asyncStatus === AsyncStatus.COMPLETE ?
    [..._.filter(todos, (todo) => todo._id !== action.data)] :
    todos;
}

function getAllTodosActionReducer(todos = [], action) {
  return action.todos || todos;
}

function updateTodoCommitActionReducer(todos = [], action) {

  if (action._asyncStatus === AsyncStatus.COMPLETE) {
    let indexOfTodo = _.findIndex(todos, (item) => item._id === action.data._id);

    return [
      ...todos.slice(0, indexOfTodo),
      action.updatedTodo,
      ...todos.slice(indexOfTodo + 1)
    ];
  }

  return todos;
}

function updateTodoAbortedActionReducer(todos = [], action) {
  if (action._asyncStatus === AsyncStatus.COMPLETE) {
    let indexOfTodo = _.findIndex(todos, (item) => item._id === action.data._id);

    return [
      ...todos.slice(0, indexOfTodo),
      action.data,
      ...todos.slice(indexOfTodo + 1)
    ];
  }

  return todos;
}

// handlers for web socket updates
function updateTodoCommitActionBroadcastActionReducer(todos = [], action) {

  let indexOfTodo = _.findIndex(todos, (item) => item._id === action.data._id);

  return [
    ...todos.slice(0, indexOfTodo),
    action.data,
    ...todos.slice(indexOfTodo + 1)
  ];
}

function addTodoActionBroadcastActionReducer(todos = [], action) {
  return [
    action.data,
    ...todos
  ];
}

function removeTodoActionBroadcastActionReducer(todos = [], action) {
  return [..._.filter(todos, (item) => item._id !== action.data)];
}

/**
 *
 * @param todos - the todos part of the app state
 * @param action - the action
 * @returns {Array}
 */
export default function todos(todos = [], action) {

  switch (action.type) {
    case AddTodoAction.type:
      return addTodoActionReducer(todos, action);
    case CompleteTodoAction.type:
      return completeTodoActionReducer(todos, action);
    case UncompleteTodoAction.type:
      return uncompleteTodoActionReducer(todos, action);
    case RemoveTodoAction.type:
      return removeTodoActionReducer(todos, action);
    case GetAllTodosAction.type:
      return getAllTodosActionReducer(todos, action);
    case UpdateTodoCommitAction.type:
      return updateTodoCommitActionReducer(todos, action);
    case UpdateTodoAbortedAction.type:
      return updateTodoAbortedActionReducer(todos, action);
    case UpdateTodoCommitActionBroadcastAction.type:
      return updateTodoCommitActionBroadcastActionReducer(todos, action);
    case RemoveTodoActionBroadcastAction.type:
      return removeTodoActionBroadcastActionReducer(todos, action);
    case AddTodoActionBroadcastAction.type:
      return addTodoActionBroadcastActionReducer(todos, action);
    default:
      return todos;
  }
}
