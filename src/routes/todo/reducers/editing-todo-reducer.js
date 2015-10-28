"use strict";

import ActionTypes from '../actions/todo-action-types';
import AsyncStatus from '../../../shared/async-status';

export default function editingTodoReducer(todo = null, action) {

  var newState = action.todo;

  switch (action.type) {
    case ActionTypes.START_TODO_EDIT:
      newState = action.todo;
      break;
    case ActionTypes.SAVE_TODO_EDIT:
      if (action._asyncStatus === AsyncStatus.FETCHING) {
        newState = action.id;
      }
      break;
    case ActionTypes.ABORT_TODO_EDIT:

  }

  return newState;
}