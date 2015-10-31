"use strict";

import AsyncActionCreator from '../../../shared/actions/async-action-creator';
import SyncActionCreator from '../../../shared/actions/sync-action-creator';

// send message
const SendMessageAction = AsyncActionCreator("SendMessageAction");

const WhoAmIAction = AsyncActionCreator("WhoAmIAction");

// receive messages from other connected users
const SendMessageActionBroadcastAction = SyncActionCreator("SendMessageActionBroadcastAction");

// when a new user connects
const UserConnectedActionBroadcastAction = SyncActionCreator("UserConnectedActionBroadcastAction");

// when a user disconnects
const UserDisconnectedActionBroadcastAction = SyncActionCreator("UserDisconnectedActionBroadcastAction");

export default {
  SendMessageAction,
  WhoAmIAction,
  SendMessageActionBroadcastAction,
  UserConnectedActionBroadcastAction,
  UserDisconnectedActionBroadcastAction
};

