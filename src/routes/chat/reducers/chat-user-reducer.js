"use strict";

import ChatActions from '../actions/chat-actions';
import AsyncStatus from '../../../shared/api/async-status';
import ChatConfig from '../chat-config';

const {
  WhoAmIAction,
  SetUsernameAction
  } = ChatActions;

export default function chatUserReducer(user = null, action) {

  var newState = user;

  if (action.container === ChatConfig.container) {
    if (action._asyncStatus === AsyncStatus.COMPLETE) {
      switch (action.type) {
        case WhoAmIAction.type:
        case SetUsernameAction.type:
          newState = action.data;
          break;
      }

    }
  }

  return newState;
};