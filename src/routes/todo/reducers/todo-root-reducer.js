"use strict";

import ActionTypes from '../actions/todo-action-types';
import _ from 'lodash';
import todos from './todos-reducer';
import todoItemText from './todo-item-text-reducer';
import inProgress from './in-progress-reducer';
import completingId from './completing-id-reducer';
import err from './err-reducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  todoItemText,
  inProgress,
  completingId,
  err,
  todos
});

export default rootReducer;