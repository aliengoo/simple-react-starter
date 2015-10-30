"use strict";

import AsyncStatus from '../../../shared/async-status';
import AsyncActionCreator from './async-action-creator';

// data {text}
const AddTodoAction =  AsyncActionCreator("AddTodoAction");
// data {id}
const CompleteTodoAction = AsyncActionCreator("CompleteTodoAction");
// data {id}
const UncompleteTodoAction = AsyncActionCreator("UncompleteTodoAction");
// data {id}
const RemoveTodoAction = AsyncActionCreator("RemoveTodoAction");
// data {_id, text}
const UpdateTodoCommitAction = AsyncActionCreator("UpdateTodoCommitAction");
// data {}
const GetAllTodosAction = AsyncActionCreator("GetAllTodosAction");
// data {id}
const GetTodoAction = SyncActionCreator("GetTodoAction");

export default {
  GetTodoAction,
  AddTodoAction,
  CompleteTodoAction,
  UncompleteTodoAction,
  RemoveTodoAction,
  UpdateTodoCommitAction,
  GetAllTodosAction
};