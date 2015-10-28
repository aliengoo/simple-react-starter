"use strict";

import React, {Component, PropTypes} from 'react';
import TodoListItemControls from './todo-list-item-controls';

export default class TodoListItem extends Component {

  render() {
    const {todo, removeTodoClick, todoBeingEdited, todoBeingEditedPriorState, completeTodoClick, uncompleteTodoClick, inProgress, activeTodoId} = this.props;

    var task = <span>{todo.text}</span>;

    if (todo.completed === true) {
      task = <span className="task-completed">{task}</span>;
    }

    var controls = (<TodoListItemControls
      completeTodoClick={completeTodoClick}
      uncompleteTodoClick={uncompleteTodoClick}
      removeTodoClick={removeTodoClick}
      todo={todo}
      inProgress={inProgress}
      activeTodoId={activeTodoId}
    />);

    if (todoBeingEditedPriorState !== null) {
      controls = (<div></div>);
    }

    return (
      <div className="todo-list-item">
        <div className="todo-list-item-task">
          {task}
        </div>
        {controls}
      </div>
    );
  }
}

TodoListItem.propTypes = {
  todoBeingEditedPriorState: PropTypes.object,
  todoBeingEdited: PropTypes.object,
  updateTodoStartedClick: PropTypes.func.isRequired,
  updateTodoCommitClick: PropTypes.func.isRequired,
  updateTodoAbortedClick: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired,
  activeTodoId: PropTypes.string,
  inProgress: PropTypes.bool,
  removeTodoClick: PropTypes.func.isRequired,
  completeTodoClick: PropTypes.func.isRequired,
  uncompleteTodoClick: PropTypes.func.isRequired
};
