"use strict";

import ChatActions from '../actions/chat-actions';
import AsyncStatus from '../../../shared/api/async-status';

const {WhoAmIAction} = ChatActions;

export default function chatUsernameReducer(username = "", action) {
  if (action._asyncStatus === AsyncStatus.COMPLETE && action.type === WhoAmIAction.type) {
    return action.data;
  }
  return username;
};