"use strict";

const SOCKET_NEW_TODO = "SOCKET_NEW_TODO";

/**
 * Respond to the server websocketing an update to an individual item
 * @param updatedTodo
 */
function socketNewTodoAction(todo) {
  return {
    type: SOCKET_NEW_TODO,
    todo
  };
}

export default {
  type: SOCKET_NEW_TODO,
  create: socketNewTodoAction
};