"use strict";

import ChatActions from '../actions/chat-actions';
import AsyncStatus from '../../../shared/api/async-status';

const {SetUsernameAction, SendMessageAction} = ChatActions;

export default function chatUsernameReducer(username = "", action) {
  if (action.type === SetUsernameAction.type) {
    return action.data;
  } else if (action.type === SendMessageAction.type && action._asyncStatus === AsyncStatus.COMPLETED) {
    return "ME";
  }
  return username;
};