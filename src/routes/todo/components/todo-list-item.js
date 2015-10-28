"use strict";

import React, {Component, PropTypes} from 'react';
import TodoListItemControls from './todo-list-item-controls';

export default class TodoListItem extends Component {

  render() {

    const {todo, removeTodoClick, completeTodoClick, uncompleteTodoClick, inProgress, activeTodoId} = this.props;

    var task = <span>{todo.text}</span>;

    if (todo.completed === true) {
      task = <span className="task-completed">{task}</span>;
    }

    return (
      <div className="todo-list-item">
        <div className="todo-list-item-task">
          {task}
        </div>
        <TodoListItemControls
          completeTodoClick={completeTodoClick}
          uncompleteTodoClick={uncompleteTodoClick}
          removeTodoClick={removeTodoClick}
          todo={todo}
          inProgress={inProgress}
          activeTodoId={activeTodoId}
        />
      </div>
    );
  }
}

TodoListItem.propTypes = {
  todo: PropTypes.object.isRequired,
  activeTodoId: PropTypes.string,
  inProgress: PropTypes.bool,
  removeTodoClick: PropTypes.func.isRequired,
  completeTodoClick: PropTypes.func.isRequired,
  uncompleteTodoClick: PropTypes.func.isRequired
};
