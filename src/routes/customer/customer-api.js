import request from 'superagent';
import Q from 'q';

const URI = "http://localhost:3000/api/";

export default class CustomerApi {

  constructor() {
    this._responseHandler = function (defer) {
      return function (err, res) {
        if (err) {
          defer.reject(err);
        } else {
          defer.resolve(res.body);
        }
      };
    }
  }

  findAll() {
    var defer = Q.defer();

    request
      .get(`${URI}customers`)
      .accept('json')
      .end(this._responseHandler(defer));

    return defer.promise;
  }

  get(id) {
    var defer = Q.defer();

    request
      .get(`${URI}customer/${id}`)
      .accept('json')
      .end(this._responseHandler(defer));

    return defer.promise;
  }

  remove(id) {
    var defer = Q.defer();

    request
      .del(`${URI}customer/${id}`)
      .accept('json')
      .end(this._responseHandler(defer));

    return defer.promise;
  }

  save(customer) {

    var defer = Q.defer();

    if (customer._id) {
      request
        .put(`${URI}customer/${customer._id}`)
        .type('json')
        .accept('json')
        .send(customer)
        .end(this._responseHandler(defer));
    } else {
      request
        .post(`${URI}customer`)
        .type('json')
        .accept('json')
        .send(customer)
        .end(this._responseHandler(defer));
    }
    return defer.promise;
  }
}