"use strict";

import React, {Component, PropTypes} from 'react';

export default class TodoListItem extends Component {

  render() {

    const {todo, completeTodoClick, inProgress, completingId} = this.props;

    var task = <td>({todo._id}) - {todo.text}</td>;

    if (todo.completed === true) {
      task = <td><span className="task-completed">({todo._id}) - {todo.text}</span></td>;
    }

    var content = <span>Completed</span>;

    if (inProgress && todo._id === completingId) {
      content = <span>Completing...</span>;
    }

    return (
      <tr>
        {task}
        <td>
          <button
            disabled={todo.completed}
            onClick={() => completeTodoClick(todo._id)}
            type="button"
            className="btn btn-primary btn-sm">{content}</button>
        </td>
      </tr>
    );
  }
}

TodoListItem.propTypes = {
  todo: PropTypes.object.isRequired,
  completingId: PropTypes.string,
  inProgress: PropTypes.bool,
  completeTodoClick: PropTypes.func.isRequired
};