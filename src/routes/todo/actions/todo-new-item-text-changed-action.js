"use strict";

import ActionTypes from './todo-action-types';

export function newItemTextChanged(newItemText) {
  return {
    type: ActionTypes.NEW_ITEM_TEXT_CHANGED,
    text: newItemText
  };
}