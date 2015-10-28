"use strict";
import AsyncStatus from '../../../shared/async-status';

export default function inProgress(state = false, action) {
  if (action._asyncStatus === AsyncStatus.FETCHING) {
    return true;
  } else if (action._asyncStatus === AsyncStatus.FAILED) {
    return false;
  } else if (action._asyncStatus === AsyncStatus.COMPLETE) {
    return false;
  }

  return state;
}