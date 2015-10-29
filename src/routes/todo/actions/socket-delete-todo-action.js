"use strict";

const SOCKET_DELETE_TODO = "SOCKET_DELETE_TODO";

/**
 * Respond to the server websocketing an update to an individual item
 * @param updatedTodo
 */
function socketDeleteTodoAction(id) {
  return {
    type: SOCKET_DELETE_TODO,
    id
  };
}

export default {
  type: SOCKET_DELETE_TODO,
  create: socketDeleteTodoAction
};