"use strict";

import _ from 'lodash';
import AsyncStatus from '../../../shared/async-status';

export default function todoItemText(text = "", action) {
  if (action._asyncStatus === AsyncStatus.COMPLETE) {
    return "";
  }

  if (_.isUndefined(action.data)) {
    return text;
  }

  if (_.isString(action.data)) {
    return action.data;
  }

  return text;
}
