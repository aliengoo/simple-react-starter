"use strict";

import AsyncStatus from '../../../shared/async-status';

export default function activeTodoId(id = "", action) {

  if (action._asyncStatus === AsyncStatus.FETCHING) {
    return action.id || id;
  } else {
    return id;
  }
}