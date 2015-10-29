"use strict";

const UPDATE_TODO_BEING_EDITED_TEXT = "UPDATE_TODO_BEING_EDITED_TEXT";

function updateTodoBeingEditedTextAction(newText) {
  return {
    type: UPDATE_TODO_BEING_EDITED_TEXT,
    newText: newText
  };
}

export default {
  type: UPDATE_TODO_BEING_EDITED_TEXT,
  create: updateTodoBeingEditedTextAction
};