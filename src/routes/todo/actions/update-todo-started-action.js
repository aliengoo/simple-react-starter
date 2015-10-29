"use strict";

const UPDATE_TODO_STARTED = "UPDATE_TODO_STARTED";

function updateTodoStarted(todoBeingEdited) {
  return {
    type: UPDATE_TODO_STARTED,
    todoBeingEdited
  };
}

export default {
  type: UPDATE_TODO_STARTED,
  create: updateTodoStarted
};