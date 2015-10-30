"use strict";
import AsyncStatus from '../api/async-status';

export default function fetching(state = false, action) {
  if (action._asyncStatus === AsyncStatus.FETCHING) {
    return true;
  } else if (action._asyncStatus === AsyncStatus.FAILED) {
    return false;
  } else if (action._asyncStatus === AsyncStatus.COMPLETE) {
    return false;
  }

  return state;
}