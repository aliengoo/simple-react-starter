"use strict";

import AsyncStatus from '../../../shared/async-status';
import SyncActions from '../actions/sync-actions';

const {UpdateTodoStartedAction, UpdateTodoCommitAction, UpdateTodoAbortedAction} = SyncActions;

/**
 * When a user starts editing a todo, the previous state is stored is the operation is aborted
 * @param todoBeingEditedPriorState - the prior state before editing begins
 * @param action
 * @returns {*}
 */
export default function todoBeingEditedPriorStateReducer(todoBeingEditedPriorState = null, action) {

  var newState = todoBeingEditedPriorState;
  switch(action.type) {
    case UpdateTodoStartedAction.type:
      newState = Object.assign({}, action.data);
      break;
    case UpdateTodoAbortedAction.type:
    case UpdateTodoCommitAction.type:
      newState = null;
      break;
  }

  return newState;
}
