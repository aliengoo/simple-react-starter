"use strict";

import _ from 'lodash';
import AsyncStatus from '../../../shared/api/async-status';
import ChatActions from '../actions/chat-actions';

const {
  UserConnectedActionBroadcastAction,
  UserDisconnectedActionBroadcastAction
  } = ChatActions;

export default function chatUsernamesReducer(usernames = [], action) {
  var newState = usernames;

  switch (action.type) {
    case UserConnectedActionBroadcastAction.type:
      newState = [...usernames, action.data];
      break;
    case UserDisconnectedActionBroadcastAction.type:
      newState = [..._.filter(usernames, action.data)];
      break;
  }

  return newState;
}
