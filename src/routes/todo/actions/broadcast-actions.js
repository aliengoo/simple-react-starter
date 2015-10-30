"use strict";

import SyncActionCreator from './sync-action-creator';


const AddTodoActionBroadcastAction = SyncActionCreator("AddTodoActionBroadcastAction");
const UpdateTodoCommitActionBroadcastAction = SyncActionCreator("UpdateTodoCommitActionBroadcastAction");
const RemoveTodoActionBroadcastAction = SyncActionCreator("RemoveTodoActionBroadcastAction");
const CompleteTodoActionBroadcastAction = SyncActionCreator("CompleteTodoActionBroadcastAction");
const UncompleteTodoActionBroadcastAction = SyncActionCreator("UncompleteTodoActionBroadcastAction");

export default {
  AddTodoActionBroadcastAction,
  UpdateTodoCommitActionBroadcastAction,
  RemoveTodoActionBroadcastAction,
  CompleteTodoActionBroadcastAction,
  UncompleteTodoActionBroadcastAction
};