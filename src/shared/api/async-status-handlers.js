"use strict";

import AsyncStatus from './async-status';

export function fetching(type, data) {
  return {
    _asyncStatus: AsyncStatus.FETCHING,
    type,
    data
  };
}

export function complete(type, data) {
  return {
    _asyncStatus: AsyncStatus.COMPLETE,
    type,
    data
  };
}

export function failed(type, data) {
  return {
    _asyncStatus: AsyncStatus.FAILED,
    type,
    data
  };
}

export function createHandlers(type) {
  return {
    fetching: (data) => {
      return {
        type,
        data,
        _asyncStatus: AsyncStatus.FETCHING
      };
    },
    complete: (data) => {
      return {
        type,
        data, _asyncStatus: AsyncStatus.COMPLETE
      };
    },
    failed: (data) => {
      return {
        type,
        data,
        _asyncStatus: AsyncStatus.FAILED
      };
    }
  };
}