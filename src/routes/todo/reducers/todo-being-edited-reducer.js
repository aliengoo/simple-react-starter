"use strict";

import AsyncStatus from '../../../shared/async-status';

import UpdateTodoBeingEditedTextAction from '../actions/update-todo-being-edited-text-action';
import UpdateTodoCommitAction from '../actions/update-todo-commit-action';
import UpdateTodoAbortedAction from '../actions/update-todo-aborted-action';
import UpdateTodoStartedAction from '../actions/update-todo-started-action';

export default function todoBeingEditedReducer(todoBeingEdited = null, action) {
  var newState = todoBeingEdited;
  switch (action.type) {
    case UpdateTodoStartedAction.type:
      console.log("prior state:", todoBeingEdited);
      newState = Object.assign({}, action.todoBeingEdited);
      console.log("new state:", newState);
      break;
    case UpdateTodoBeingEditedTextAction.type:
      newState = Object.assign({}, todoBeingEdited, {
        text: action.newText
      });
      break;
    case UpdateTodoAbortedAction.type:
    case UpdateTodoCommitAction.type:
      newState = null;
      break;
  }



  return newState;
}
