"use strict";

import AsyncStatus from '../../../shared/async-status';
import ActionTypes from '../actions/todo-action-types';

export default function activeTodoId(id = "", action) {

  if (action._asyncStatus === AsyncStatus.FETCHING) {
    return action.id || id;
  } else {
    return id;
  }
}