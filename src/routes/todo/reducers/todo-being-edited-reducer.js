"use strict";

import SyncActions from '../actions/sync-actions';

const {UpdateTodoStartedAction, UpdateTodoCommitAction, UpdateTodoAbortedAction, UpdateTodoBeingEditedTextAction} = SyncActions;

export default function todoBeingEditedReducer(todoBeingEdited = null, action) {
  var newState = todoBeingEdited;
  switch (action.type) {
    case UpdateTodoStartedAction.type:
      newState = Object.assign({}, action.data);
      break;
    case UpdateTodoBeingEditedTextAction.type:
      newState = Object.assign({}, todoBeingEdited, {
        text: action.data
      });
      break;
    case UpdateTodoAbortedAction.type:
    case UpdateTodoCommitAction.type:
      newState = null;
      break;
  }

  return newState;
}
