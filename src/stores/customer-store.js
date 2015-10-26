"use strict";

import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionTypes from '../constants/action-types';
import assign from 'object-assign';
import _ from 'lodash';
import {EventEmitter} from 'events';

let CHANGE_EVENT = "change";

let _customers = [];

let CustomerStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  getAllCustomers: function () {
    return _customers;
  },

  getAuthorById: function (id) {
    return _.find(_customers, {
      _id: id
    });
  }
});

export default CustomerStore;

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case ActionTypes.SAVE_CUSTOMER:

      _customers.push(action.customer);
      CustomerStore.emitChange();
      break;
    case ActionTypes.INIT_CUSTOMERS:
      _customers = action.customers;
      CustomerStore.emitChange();
    default:
      return new Error("Not found");
  }
});