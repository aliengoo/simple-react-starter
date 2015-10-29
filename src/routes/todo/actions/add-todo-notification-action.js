"use strict";

import {getSocket} from '../todo-socket-handler';

const ADD_TODO_NOTIFICATION = "ADD_TODO_NOTIFICATION";

/**
 * Respond to the server websocketing an update to an individual item
 * @param updatedTodo
 */
function addTodoNotification(todo) {
  return {
    type: ADD_TODO_NOTIFICATION,
    todo
  };
}

export default {
  type: ADD_TODO_NOTIFICATION,
  create: addTodoNotification
};
