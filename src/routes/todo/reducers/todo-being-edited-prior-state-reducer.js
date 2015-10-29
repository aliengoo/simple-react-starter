"use strict";

import AsyncStatus from '../../../shared/async-status';

import UpdateTodoCommitAction from '../actions/update-todo-commit-action';
import UpdateTodoAbortedAction from '../actions/update-todo-aborted-action';
import UpdateTodoStartedAction from '../actions/update-todo-started-action';

/**
 * When a user starts editing a todo, the previous state is stored is the operation is aborted
 * @param todo - the prior state before editing begins
 * @param action
 * @returns {*}
 */
export default function todoBeingEditedPriorStateReducer(todoBeingEditedPriorState = null, action) {

  var newState = todoBeingEditedPriorState;
  switch(action.type) {
    case UpdateTodoStartedAction.type:
      newState = Object.assign({}, action.todoBeingEdited);
      break;
    case UpdateTodoAbortedAction.type:
    case UpdateTodoCommitAction.type:
      newState = null;
      break;
  }

  return newState;
}
