"use strict";
import AsyncStatus from '../../../shared/async-status';

export default function inProgress(state = false, action) {
  if (action._asyncsTATUS === true) {
    return true;
  } else if (action._asyncFailed === true) {
    return false;
  }

  return state;
}