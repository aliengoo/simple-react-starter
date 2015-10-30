"use strict";

import AsyncStatus from '../../../shared/async-status';

export default function err(state = "", action) {

  if (action._asyncStatus === AsyncStatus.FAILED) {
    return action.data;
  }

  return state;
}