"use strict";

const SOCKET_UPDATE_TODO = "SOCKET_UPDATE_TODO";

/**
 * Respond to the server websocketing an update to an individual item
 * @param updatedTodo
 */
function socketUpdateTodoAction(todo) {
  return {
    type: SOCKET_UPDATE_TODO,
    todo
  };
}

export default {
  type: SOCKET_UPDATE_TODO,
  create: socketUpdateTodoAction
};