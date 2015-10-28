"use strict";

import AsyncStatus from '../../../shared/async-status';

export default function todoItemText(text = "", action) {
  if (action._asyncStatus === AsyncStatus.COMPLETE) {
    return "";
  }

  if (action.text === undefined) {
    return text;
  } else {
    return action.text;
  }
}
