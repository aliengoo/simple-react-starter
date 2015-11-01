"use strict";

import _ from 'lodash';
import AsyncStatus from '../../../shared/api/async-status';
import ChatActions from '../actions/chat-actions';
import ChatConfig from '../chat-config';

const {
  GetUsersAction,
  SetUsernameAction,
  SetUsernameActionBroadcastAction,
  UserDisconnectedActionBroadcastAction
  } = ChatActions;

export default function chatUsersReducer(users = [], action) {
  var newState = users;

  if (action.container = ChatConfig.container) {
    switch (action.type) {
      case SetUsernameActionBroadcastAction.type:
        newState = [...users, action.data];
        break;
      case UserDisconnectedActionBroadcastAction.type:
        newState = [..._.filter(users, (user) => {
          return user.socketId !== action.data;
        })];
        break;
      case SetUsernameAction.type:
        if (action._asyncStatus === AsyncStatus.COMPLETE) {
          var indexOfUser = _.findIndex(users, {
            socketId: action.data.socketId
          });

          newState = [
            ...users.slice(0, indexOfUser),
            action.data,
            ...users.slice(indexOfUser + 1)
          ];
        }
        break;
      case GetUsersAction.type:
        if(action._asyncStatus === AsyncStatus.COMPLETE) {
          newState = action.data;
        }
        break;
    }
  }

  return newState;
}
