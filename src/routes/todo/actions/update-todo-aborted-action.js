"use strict";

import AsyncStatus from '../../../shared/async-status';

const UPDATE_TODO_ABORTED = "UPDATE_TODO_ABORTED";

function updateAbortedTodo(todoBeingEditedPriorState) {
  return {
    type: UPDATE_TODO_ABORTED,
    todoBeingEditedPriorState
  };
}

export default {
  create: updateAbortedTodo,
  type: UPDATE_TODO_ABORTED
};