"use strict";

import _ from 'lodash';
import AsyncStatus from '../../../shared/api/async-status';
import SyncActions from '../actions/sync-actions';
import TodoConfig from '../todo-config';

const {TodoItemTextChangedAction} = SyncActions;

export default function todoItemText(text = "", action) {

  var newState = text;

  if (action.container === TodoConfig.container) {
    if (action._asyncStatus === AsyncStatus.COMPLETE) {
      return "";
    }

    if (TodoItemTextChangedAction.type === action.type) {
      if (_.isUndefined(action.data)) {
        return text;
      }

      if (_.isString(action.data)) {
        return action.data;
      }
    }
  }

  return newState;
}
