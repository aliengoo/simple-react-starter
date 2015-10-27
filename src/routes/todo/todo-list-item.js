"use strict";

import React, {Component, PropTypes} from 'react';
import TodoCompletedBtn from './todo-completed-btn';
import TodoRemoveBtn from './todo-remove-btn';

export default class TodoListItem extends Component {

  render() {

    const {todo, removeTodoClick, completeTodoClick, inProgress, completingId} = this.props;

    var task = <span>({todo._id}) - {todo.text}</span>;

    if (todo.completed === true) {
      task = <span className="task-completed">{task}</span>;
    }

    return (
      <li className="todo-list-item">
        <span>
          {task}
        </span>
        <span>
          <TodoCompletedBtn
            completeTodoClick={completeTodoClick}
            todo={todo}
            inProgress={inProgress}
            completingId={completingId}/>

          <TodoRemoveBtn
            removeTodoClick={removeTodoClick}
            todoId={todo._id}
            inProgress={inProgress}/>
        </span>
      </li>
    );
  }
}

TodoListItem.propTypes = {
  todo: PropTypes.object.isRequired,
  completingId: PropTypes.string,
  inProgress: PropTypes.bool,
  removeTodoClick: PropTypes.func.isRequired,
  completeTodoClick: PropTypes.func.isRequired
};