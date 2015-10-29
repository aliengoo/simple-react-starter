"use strict";

import React, {Component, PropTypes} from 'react';

import CompleteTodoBtn from './complete-todo-btn';
import UncompleteTodoBtn from './uncomplete-todo-btn';
import RemoveTodoBtn from './remove-todo-btn';

import UpdateTodoAbortBtn from './update-todo-abort-btn';
import UpdateTodoCommitBtn from './update-todo-commit-btn';

export default class TodoListItemControls extends Component {
  render() {

    const {
      completeTodoClick,
      updateTodoAbortedClick,
      updateTodoCommitClick,
      uncompleteTodoClick,
      todoBeingEdited,
      removeTodoClick,
      todo,
      inProgress,
      activeTodoId} = this.props;

    return (
      <div className="todo-list-item-controls">
        <div>
          <CompleteTodoBtn
            completeTodoClick={completeTodoClick}
            inProgress={inProgress}
            activeTodoId={activeTodoId}
            todoBeingEdited={todoBeingEdited}
            todo={todo}/>

          <UncompleteTodoBtn
            uncompleteTodoClick={uncompleteTodoClick}
            inProgress={inProgress}
            activeTodoId={activeTodoId}
            todoBeingEdited={todoBeingEdited}
            todo={todo}/>

          <RemoveTodoBtn
            removeTodoClick={removeTodoClick}
            inProgress={inProgress}
            activeTodoId={activeTodoId}
            todoBeingEdited={todoBeingEdited}
            todo={todo}/>


          <UpdateTodoCommitBtn
            updateTodoCommitClick={updateTodoCommitClick}
            inProgress={inProgress}
            activeTodoId={activeTodoId}
            todo={todo}
            todoBeingEdited={todoBeingEdited}
          />

          <UpdateTodoAbortBtn
            updateTodoAbortedClick={updateTodoAbortedClick}
            inProgress={inProgress}
            activeTodoId={activeTodoId}
            todo={todo}
            todoBeingEdited={todoBeingEdited}
          />
        </div>
      </div>
    );
  }
}

TodoListItemControls.propTypes = {
  todo: PropTypes.object.isRequired,
  todoBeingEdited: PropTypes.object,
  updateTodoCommitClick: PropTypes.func.isRequired,
  updateTodoAbortedClick: PropTypes.func.isRequired,
  inProgress: PropTypes.bool,
  activeTodoId: PropTypes.string,
  completeTodoClick: PropTypes.func.isRequired,
  uncompleteTodoClick: PropTypes.func.isRequired,
  removeTodoClick: PropTypes.func.isRequired
};