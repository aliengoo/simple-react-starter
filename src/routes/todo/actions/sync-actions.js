"use strict";

import SyncActionCreator from '../../../shared/actions/sync-action-creator';
import TodoConfig from '../todo-config';

const UpdateTodoStartedAction = SyncActionCreator("UpdateTodoStartedAction", TodoConfig.container);
const UpdateTodoBeingEditedTextAction = SyncActionCreator("UpdateTodoBeingEditedTextAction", TodoConfig.container);
const UpdateTodoAbortedAction = SyncActionCreator("UpdateTodoAbortedAction", TodoConfig.container);
const TodoItemTextChangedAction = SyncActionCreator("TodoItemTextChangedAction", TodoConfig.container);

export default {
  UpdateTodoStartedAction,
  UpdateTodoBeingEditedTextAction,
  UpdateTodoAbortedAction,
  TodoItemTextChangedAction
};