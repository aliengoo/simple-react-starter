"use strict";

const TODO_ITEM_TEXT_CHANGED = "TODO_ITEM_TEXT_CHANGED";

function todoItemTextChanged(text) {
  return {
    type: TODO_ITEM_TEXT_CHANGED,
    text
  };
}

export default {
  create: todoItemTextChanged,
  type: TODO_ITEM_TEXT_CHANGED
};