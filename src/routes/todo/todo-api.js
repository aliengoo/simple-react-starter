"use strict";

import request from 'superagent';
import Q from 'q';

const URI = "http://localhost:3000/api/";

export default class TodoApi {

  constructor() {
    this._responseHandler = function (defer) {
      return function (err, res) {
        if (err) {
          defer.reject(err);
        } else {
          defer.resolve(res.body);
        }
      };
    };
  }

  findAll() {
    var defer = Q.defer();

    request
      .get(`${URI}todos`)
      .accept('json')
      .end(this._responseHandler(defer));

    return defer.promise;
  }

  get(id) {
    var defer = Q.defer();

    request
      .get(`${URI}todo/${id}`)
      .accept('json')
      .end(this._responseHandler(defer));

    return defer.promise;
  }

  remove(id) {
    var defer = Q.defer();

    request
      .del(`${URI}todo/${id}`)
      .accept('json')
      .end(this._responseHandler(defer));

    return defer.promise;
  }

  complete(id) {
    var defer = Q.defer();

    request
      .put(`${URI}todo/complete/${id}`)
      .accept('json')
      .end(this._responseHandler(defer));

    return defer.promise;
  }

  save(todo) {

    var defer = Q.defer();

    if (todo._id) {
      request
        .put(`${URI}todo/${todo._id}`)
        .type('json')
        .accept('json')
        .send(todo)
        .end(this._responseHandler(defer));
    } else {
      request
        .post(`${URI}todo`)
        .type('json')
        .accept('json')
        .send(todo)
        .end(this._responseHandler(defer));
    }
    return defer.promise;
  }
}