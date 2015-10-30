"use strict";

import AsyncStatus from '../../../shared/api/async-status';
import _ from 'lodash';

export default function activeTodoId(id = "", action) {

  if (_.isString(action.data) && action._asyncStatus === AsyncStatus.FETCHING) {
    return action.data || id;
  } else {
    return id;
  }
}