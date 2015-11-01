"use strict";

import AsyncStatus from '../../../shared/api/async-status';
import AsyncActionCreator from '../../../shared/actions/async-action-creator';
import TodoConfig from '../todo-config';

// data {text}
const AddTodoAction = AsyncActionCreator("AddTodoAction", TodoConfig.container);
// data {id}
const CompleteTodoAction = AsyncActionCreator("CompleteTodoAction", TodoConfig.container);
// data {id}
const UncompleteTodoAction = AsyncActionCreator("UncompleteTodoAction", TodoConfig.container);
// data {id}
const RemoveTodoAction = AsyncActionCreator("RemoveTodoAction", TodoConfig.container);
// data {_id, text}
const UpdateTodoCommitAction = AsyncActionCreator("UpdateTodoCommitAction", TodoConfig.container);
// data {}
const GetAllTodosAction = AsyncActionCreator("GetAllTodosAction", TodoConfig.container);
// data {id}
const GetTodoAction = AsyncActionCreator("GetTodoAction", TodoConfig.container);

export default {
  GetTodoAction,
  AddTodoAction,
  CompleteTodoAction,
  UncompleteTodoAction,
  RemoveTodoAction,
  UpdateTodoCommitAction,
  GetAllTodosAction
};