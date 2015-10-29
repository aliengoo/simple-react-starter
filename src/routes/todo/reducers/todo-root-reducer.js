"use strict";

import _ from 'lodash';
import todos from './todos-reducer';
import todoItemText from './todo-item-text-reducer';
import inProgress from './in-progress-reducer';
import activeTodoId from './active-todo-id-reducer';
import err from './err-reducer';
import todoBeingEditedPriorState from './todo-being-edited-prior-state-reducer';
import todoBeingEdited from './todo-being-edited-reducer';
import socket from './socket-reducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  socket,
  todoBeingEditedPriorState,
  todoBeingEdited,
  todoItemText,
  inProgress,
  activeTodoId,
  err,
  todos
});

export default rootReducer;