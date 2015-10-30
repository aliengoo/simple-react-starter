"use strict";

import AsyncStatus from '../../../shared/api/async-status';
import ChatActions from '../actions/chat-actions';

const {
  SendMessageAction,
  SendMessageActionBroadcastAction} = ChatActions;

export default function chatMessages(messages = [], action) {

  var newState = messages;
  switch (action.type) {
    case SendMessageAction.type:
      if (action._asyncStatus === AsyncStatus.COMPLETE && action.data) {
        newState = [...messages, action.data];
      }
      break;
    case SendMessageActionBroadcastAction.type:
      newState = [...messages, action.data];
      break;
  }

  return newState;
}