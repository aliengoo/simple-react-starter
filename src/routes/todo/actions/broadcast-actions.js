"use strict";

import SyncActionCreator from './sync-action-creator';


const AddTodoActionBroadcastAction = SyncActionCreator("AddTodoActionBroadcastAction");
const UpdateTodoCommitActionBroadcastAction = SyncActionCreator("UpdateTodoCommitActionBroadcastAction");
const RemoveTodoActionBroadcastAction = SyncActionCreator("RemoveTodoActionBroadcastAction");

export default {
  AddTodoActionBroadcastAction,
  UpdateTodoCommitActionBroadcastAction,
  RemoveTodoActionBroadcastAction
};