"use strict";

const UPDATE_TODO_STARTED = "UPDATE_TODO_STARTED";

function updateTodoStarted(todo) {
  return {
    type: UPDATE_TODO_STARTED,
    todo
  };
}

export default {
  type: UPDATE_TODO_STARTED,
  create: updateTodoStarted
};