"use strict";

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root-reducer';
import { devTools, persistState } from 'redux-devtools';

const initialState = {
  chatMessages: [],
  chatUsername: "",
  chatUsernames: [],
  todoItemText: "",
  fetching: false,
  activeTodoId: "",
  todoBeingEdited: null,
  todoBeingEditedPriorState: null,
  err: "",
  todos: []
};

const loggerMiddleware = createLogger();

let finalCreateStore;

if (document.getElementById('react-container').hasAttribute("debug")) {

  // include debug information in page
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
    todoStore = finalCreateStore(rootReducer, initialState);
  }

  return todoStore;
};