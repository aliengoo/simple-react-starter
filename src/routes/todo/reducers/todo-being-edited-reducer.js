"use strict";

import AsyncStatus from '../../../shared/async-status';

import UpdateTodoCommitAction from '../actions/update-todo-commit-action';
import UpdateTodoAbortedAction from '../actions/update-todo-aborted-action';
import UpdateTodoStartedAction from '../actions/update-todo-started-action';

export default function todoBeingEditedReducer(todoBeingEdited = null, action) {
  var newState = todoBeingEdited;
  switch(action.type) {
    case UpdateTodoStartedAction.type:
      newState = Object.assign({}, todoBeingEdited);
      break;
    case UpdateTodoAbortedAction.type:
    case UpdateTodoCommitAction.type:
      newState = null;
      break;
  }

  return newState;
}
