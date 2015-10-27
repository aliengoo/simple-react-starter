"use strict";

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { compose, createStore, applyMiddleware } from 'redux';
import todoApp from '../reducers/todo-app';
// Redux DevTools store enhancers
import { devTools, persistState } from 'redux-devtools';


const initialState = {
  newItemText: "",
  inProgress: false,
  completingId: "",
  err: "",
  todos: []
};

const loggerMiddleware = createLogger();

let finalCreateStore;

if (document.getElementById('react-container').hasAttribute("debug")) {
  finalCreateStore = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  finalCreateStore = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )(createStore);
}

let todoStore;

export default function instance() {
  if (!todoStore) {
    todoStore = finalCreateStore(todoApp, initialState);
  }

  return todoStore;
};