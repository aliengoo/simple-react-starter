"use strict";

import _ from 'lodash';
import SyncActions from '../actions/sync-actions';
import AsyncActions from '../actions/async-actions';
import TodoConfig from '../todo-config';

const {
  UpdateTodoStartedAction,

  UpdateTodoAbortedAction,
  UpdateTodoBeingEditedTextAction} = SyncActions;

const {UpdateTodoCommitAction} = AsyncActions;

export default function todoBeingEditedReducer(todoBeingEdited = null, action) {
  var newState = todoBeingEdited;

  if (action.container === TodoConfig.container) {
    switch (action.type) {
      case UpdateTodoStartedAction.type:

        if (_.isObject(action.data)) {
          newState = Object.assign({}, action.data);
        }

        break;
      case UpdateTodoBeingEditedTextAction.type:

        if (_.isString(action.data)) {
          newState = Object.assign({}, todoBeingEdited, {
            text: action.data
          });
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
