"use strict";

import AppDispatcher from '../dispatcher/app-dispatcher';
import CustomerApi from '../routes/customer/customer-api';
import ActionTypes from '../constants/action-types';
import Q from 'q';

export default class CustomerActions {
  constructor() {
    this._api = new CustomerApi();
  }

  initCustomers() {
    var defer = Q.defer();

    this._api.findAll().then((customers) => {
      AppDispatcher.dispatch({
        actionType: ActionTypes.INIT_CUSTOMERS,
        customers: customers || []
      });

    }, defer.reject);

    return defer.promise;
  }

  saveCustomer(customer) {
    var defer = Q.defer();

    this._api.save(customer).then(function (result) {
      // Hey dispatcher, go tell all the stores that a customer was just created.
      AppDispatcher.dispatch({
        actionType: ActionTypes.SAVE_CUSTOMER,
        customer: result
      });

      defer.resolve(result);
    }, function (error) {
      defer.reject(error);
    });

    return defer.promise;
  }
}