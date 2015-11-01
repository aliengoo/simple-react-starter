"use strict";

import AsyncStatus from '../../../shared/api/async-status';
import TodoConfig from '../todo-config';

import _ from 'lodash';

export default function activeTodoId(id = "", action) {

  var newState = id;

  if (action.container === TodoConfig.container) {
    if (_.isString(action.data) && action._asyncStatus === AsyncStatus.FETCHING) {
      newState = action.data || id;
    }
  }

  return newState;
}