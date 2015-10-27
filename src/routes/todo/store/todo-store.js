"use strict";

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import todoApp from '../reducers/todo-app';

const initialState = {
  inProgress: false,
  completingId: "",
  err: "",
  todos: []
};

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
)(createStore);

export default function createTodoStore() {
  const todoStore = createStoreWithMiddleware(todoApp, initialState);

  return todoStore;
};