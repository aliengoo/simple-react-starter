"use strict";

import SyncActionCreator from '../../../shared/actions/sync-action-creator';

const UpdateTodoStartedAction = SyncActionCreator("UpdateTodoStartedAction");
const UpdateTodoBeingEditedTextAction = SyncActionCreator("UpdateTodoBeingEditedTextAction");
const UpdateTodoAbortedAction = SyncActionCreator("UpdateTodoAbortedAction");
const TodoItemTextChangedAction = SyncActionCreator("TodoItemTextChangedAction");

export default {
  UpdateTodoStartedAction,
  UpdateTodoBeingEditedTextAction,
  UpdateTodoAbortedAction,
  TodoItemTextChangedAction
};