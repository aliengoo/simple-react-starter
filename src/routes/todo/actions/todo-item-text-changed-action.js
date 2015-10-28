"use strict";

import ActionTypes from './todo-action-types';

export function todoItemTextChanged(text) {
  return {
    type: ActionTypes.TODO_ITEM_TEXT_CHANGED,
    text
  };
}