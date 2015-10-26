"use strict";

import {EventEmitter} from 'events';
import appDispatcher from '../dispatcher/app-dispatcher';
import ActionTypes from '../actions/todo-action-types';
import Immutable from 'immutable';
import _ from 'lodash';

const CHANGE_EVENT = 'change';

class TodoStore extends EventEmitter {

  constructor() {
    super();

    // initial state
    Object.defineProperty(this, "_todos", {
      writable: true,
      value: []
    });

    Object.defineProperty(this, "_inProgress", {
      writable: true,
      value: false
    });

    Object.defineProperty(this, "_err", {
      writable: true,
      value: undefined
    });

    Object.defineProperty(this, "_dispatchToken", {
      writable: true,
      value: undefined
    });
  }

  setDispatchToken(dispatchToken) {
    this._dispatchToken = dispatchToken;
  }

  getDispatchToken() {
    return this._dispatchToken;
  }

  getErr() {
    return this._err;
  }

  setErr(err) {
    this._err = err;
  }

  getTodos() {
    return this._todos;
  }

  getTodo(id) {
    return _.find(this._todos, {
      _id: id
    });
  }

  getTodoByIndex(index) {
    console.log(this._todos);
    return this._todos[index];
  }

  setTodos(todos) {
    var index = 0;

    this._todos = _.map(todos, (todo) => {
      return {
        text: todo.text,
        completed: todo.completed,
        _id: todo._id,
        key: ++index
      };
    });

    console.log(this._todos);

  }

  addTodo(todo) {
    // add the latest item at the top
    var temp = Immutable.List(this._todos).unshift(todo).toArray();

    this.setTodos(temp);
  }

  completeTodo(todo) {
    var temp = Immutable.List(this._todos).toArray();

    _.forEach(temp, (item) => {
      if (item._id === todo._id) {
        item.completed = true;
      }
    });

    this._todos = temp;
  }

  getInProgress() {
    return this._inProgress;
  }

  setInProgress(inProgress) {
    this._inProgress = inProgress;
    this._err = undefined;
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }
}

var todoStore = new TodoStore();

todoStore.setDispatchToken(appDispatcher.register(function (action) {
  switch (action.actionType) {
    case ActionTypes.ADD_TODO_STARTED:
    case ActionTypes.COMPLETE_TODO_STARTED:
    case ActionTypes.FIND_ALL_TODOS_STARTED:
      // set the current state to be in progress
      todoStore.setInProgress(true);
      todoStore.emitChange();
      break;
    case ActionTypes.ADD_TODO_ENDED:
      todoStore.addTodo(action.todo);
      todoStore.setErr(undefined);
      todoStore.emitChange();
      break;
    case ActionTypes.COMPLETE_TODO_ENDED:
      todoStore.completeTodo(action.todo);
      todoStore.setErr(undefined);
      todoStore.emitChange();
      break;
    case ActionTypes.FIND_ALL_TODOS_ENDED:
      todoStore.setTodos(action.todos);
      todoStore.setErr(undefined);
      todoStore.emitChange();
      break;
    case ActionTypes.ADD_TODO_ERR:
    case ActionTypes.COMPLETE_TODO_ERR:
    case ActionTypes.FIND_ALL_TODOS_ERR:
      todoStore.setErr(action.err);
      todoStore.emitChange();
      break;
  }

  return true;

}));


export default todoStore;

