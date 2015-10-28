"use strict";

import AsyncStatus from '../../../shared/async-status';
import ActionTypes from '../actions/todo-action-types';

export default function completingId(state = "", action) {

  if (action.type === ActionTypes.COMPLETE_TODO) {
    if (action._asyncStatus === AsyncStatus.FETCHING) {
      return action.id;
    } else {
      return "";
    }
  }

  return state;
}