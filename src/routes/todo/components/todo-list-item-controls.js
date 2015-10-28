"use strict";

import React, {Component, PropTypes} from 'react';

import TodoCompleteBtn from './todo-complete-btn';
import TodoUncompleteBtn from './todo-uncomplete-btn';
import TodoRemoveBtn from './todo-remove-btn';

export default class TodoListItemControls extends Component {
  render() {

    const {completeTodoClick, uncompleteTodoClick, removeTodoClick, todo, inProgress, activeTodoId} = this.props;

    return (
      <div className="todo-list-item-controls">
        <div>
          <TodoCompleteBtn
            completeTodoClick={completeTodoClick}
            inProgress={inProgress}
            activeTodoId={activeTodoId}
            todo={todo}/>

          <TodoUncompleteBtn
            uncompleteTodoClick={uncompleteTodoClick}
            inProgress={inProgress}
            activeTodoId={activeTodoId}
            todo={todo}/>


          <TodoRemoveBtn
            removeTodoClick={removeTodoClick}
            inProgress={inProgress}
            activeTodoId={activeTodoId}
            todo={todo}/>
        </div>
      </div>
    );
  }
}

TodoListItemControls.propTypes = {
  todo: PropTypes.object.isRequired,
  todoBeingEditedPriorState: PropTypes.object,
  todoBeingEdited: PropTypes.object,
  updateTodoStartedClick: PropTypes.func.isRequired,
  updateTodoCommitClick: PropTypes.func.isRequired,
  updateTodoAbortedClick: PropTypes.func.isRequired,
  inProgress: PropTypes.bool,
  activeTodoId: PropTypes.string,
  completeTodoClick: PropTypes.func.isRequired,
  uncompleteTodoClick: PropTypes.func.isRequired,
  removeTodoClick: PropTypes.func.isRequired
};