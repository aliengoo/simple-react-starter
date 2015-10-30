"use strict";

import _ from 'lodash';
import AsyncStatus from '../../../shared/async-status';
import SyncActions from '../actions/sync-actions';

const {TodoItemTextChangedAction} = SyncActions;

export default function todoItemText(text = "", action) {
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

  return text;
}
