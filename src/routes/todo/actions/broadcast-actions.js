"use strict";

import SyncActionCreator from '../../../shared/actions/sync-action-creator';
import TodoConfig from '../todo-config';

const AddTodoActionBroadcastAction
  = SyncActionCreator("AddTodoActionBroadcastAction", TodoConfig.container);
const UpdateTodoCommitActionBroadcastAction
  = SyncActionCreator("UpdateTodoCommitActionBroadcastAction", TodoConfig.container);
const RemoveTodoActionBroadcastAction
  = SyncActionCreator("RemoveTodoActionBroadcastAction", TodoConfig.container);
const CompleteTodoActionBroadcastAction
  = SyncActionCreator("CompleteTodoActionBroadcastAction", TodoConfig.container);
const UncompleteTodoActionBroadcastAction
  = SyncActionCreator("UncompleteTodoActionBroadcastAction", TodoConfig.container);

export default {
  AddTodoActionBroadcastAction,
  UpdateTodoCommitActionBroadcastAction,
  RemoveTodoActionBroadcastAction,
  CompleteTodoActionBroadcastAction,
  UncompleteTodoActionBroadcastAction
};