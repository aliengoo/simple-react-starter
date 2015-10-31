"use strict";

import AsyncStatus from '../../../shared/api/async-status';
import ChatActions from '../actions/chat-actions';
import ChatConfig from '../chat-config';

const {
  SendMessageAction,
  SendMessageActionBroadcastAction} = ChatActions;

function queue(messages, message) {
  var _queue = [...messages, message];
  if (_queue.length > ChatConfig.messageBufferSize) {
    _queue.shift();
  }
  return _queue;
}

export default function chatMessages(messages = [], action) {

  var newState = messages;
  switch (action.type) {
    case SendMessageAction.type:
      if (action._asyncStatus === AsyncStatus.COMPLETE && action.data) {
        newState = queue(messages, action.data);
      }
      break;
    case SendMessageActionBroadcastAction.type:
      newState = queue(messages, action.data);
      break;
  }

  return newState;
}