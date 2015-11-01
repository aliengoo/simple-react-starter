"use strict";

import AsyncActionCreator from '../../../shared/actions/async-action-creator';
import SyncActionCreator from '../../../shared/actions/sync-action-creator';
import ChatConfig from '../chat-config';

// send message

const SendMessageAction = AsyncActionCreator("SendMessageAction", ChatConfig.container);

const WhoAmIAction = AsyncActionCreator("WhoAmIAction", ChatConfig.container);

const GetUsersAction = AsyncActionCreator("GetUsersAction", ChatConfig.container);

const SetUsernameAction = AsyncActionCreator("SetUsernameAction", ChatConfig.container);

const SetUsernameActionBroadcastAction = SyncActionCreator("SetUsernameActionBroadcastAction", ChatConfig.container);

// receive messages from other connected users
const SendMessageActionBroadcastAction = SyncActionCreator("SendMessageActionBroadcastAction", ChatConfig.container);

// when a new user connects
const UserConnectedActionBroadcastAction = SyncActionCreator("UserConnectedActionBroadcastAction", ChatConfig.container);

// when a user disconnects
const UserDisconnectedActionBroadcastAction = SyncActionCreator("UserDisconnectedActionBroadcastAction", ChatConfig.container);

export default {
  SendMessageAction,
  WhoAmIAction,
  GetUsersAction,
  SetUsernameAction,
  SetUsernameActionBroadcastAction,
  SendMessageActionBroadcastAction,
  UserConnectedActionBroadcastAction,
  UserDisconnectedActionBroadcastAction
};

