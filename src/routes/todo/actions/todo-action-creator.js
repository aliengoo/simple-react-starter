"use strict";

import ActionTypes from './todo-action-types';
import TodoApi from '../todo-api';
import appDispatcher from '../dispatcher/app-dispatcher';

class TodoActionCreator {
  constructor() {
    Object.defineProperty(this, "_api", {
      value: new TodoApi()
    });
  }

  findAllTodos() {
    appDispatcher.dispatch({
      actionType: ActionTypes.FIND_ALL_TODOS_STARTED
    });

    this._api.findAll().then((todos) => {
      appDispatcher.dispatch({
        actionType: ActionTypes.FIND_ALL_TODOS_ENDED,
        todos
      });

    }, (err) => {
      appDispatcher.dispatch({
        actionType: ActionTypes.FIND_ALL_TODOS_ERR,
        err
      });
    });
  }

  addTodo(text) {
    appDispatcher.dispatch({
      actionType: ActionTypes.ADD_TODO_STARTED
    });

    this._api.save({
      text: text
    }).then((todo) => {
      appDispatcher.dispatch({
        actionType: ActionTypes.ADD_TODO_ENDED,
        todo
      });
    }, (err) => {
      appDispatcher.dispatch({
        actionType: ActionTypes.ADD_TODO_ERR,
        err
      });
    });
  }

  completeTodo(id) {
    appDispatcher.dispatch({
      actionType: ActionTypes.COMPLETE_TODO_STARTED
    });

    this._api.complete(id).then((todo) => {
      appDispatcher.dispatch({
        actionType: ActionTypes.COMPLETE_TODO_ENDED,
        todo
      });
    }, (err) => {
      appDispatcher.dispatch({
        actionType: ActionTypes.COMPLETE_TODO_ERR,
        err
      });
    });
  }
}

var todoActionCreator = new TodoActionCreator();

export default todoActionCreator;