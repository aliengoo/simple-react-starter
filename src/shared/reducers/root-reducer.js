"use strict";

import _ from 'lodash';
import err from './err-reducer';
import fetching from './fetching-reducer';

// chat container
import chatUsers from '../../routes/chat/reducers/chat-users-reducer';
import chatUser from '../../routes/chat/reducers/chat-user-reducer';
import chatMessages from '../../routes/chat/reducers/chat-messages-reducer';

// todo container
import todos from '../../routes/todo/reducers/todos-reducer';
import todoItemText from '../../routes/todo/reducers/todo-item-text-reducer';
import activeTodoId from '../../routes/todo/reducers/active-todo-id-reducer';
import todoBeingEditedPriorState from '../../routes/todo/reducers/todo-being-edited-prior-state-reducer';
import todoBeingEdited from '../../routes/todo/reducers/todo-being-edited-reducer';


import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  chatUsers,
  chatUser,
  chatMessages,
  todoBeingEditedPriorState,
  todoBeingEdited,
  todoItemText,
  fetching,
  activeTodoId,
  err,
  todos
});

export default rootReducer;