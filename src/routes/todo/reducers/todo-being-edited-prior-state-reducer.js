"use strict";

import _ from 'lodash';

import AsyncStatus from '../../../shared/api/async-status';
import SyncActions from '../actions/sync-actions';
import AsyncActions from '../actions/async-actions';
import TodoConfig from '../todo-config';

const {UpdateTodoStartedAction, UpdateTodoAbortedAction} = SyncActions;
const {UpdateTodoCommitAction} = AsyncActions;


/**
 * When a user starts editing a todo, the previous state is stored is the operation is aborted
 * @param todoBeingEditedPriorState - the prior state before editing begins
 * @param action
 * @returns {*}
 */
export default function todoBeingEditedPriorStateReducer(todoBeingEditedPriorState = null, action) {

  var newState = todoBeingEditedPriorState;

  if (action.container === TodoConfig.container) {
    switch (action.type) {
      case UpdateTodoStartedAction.type:
        if (_.isObject(action.data)) {
          newState = Object.assign({}, action.data);
        }
        break;
      case UpdateTodoAbortedAction.type:
      case UpdateTodoCommitAction.type:
        newState = null;
        break;
    }
  }

  return newState;
}
