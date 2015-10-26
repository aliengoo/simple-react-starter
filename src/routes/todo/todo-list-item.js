"use strict";

import React from 'react';
import todoActionCreator from './actions/todo-action-creator';
import todoStore from './store/todo-store';

export default class TodoListItem extends React.Component {

  constructor() {
    super();

    this._completeTodo = this._completeTodo.bind(this);
  }

  _completeTodo() {
    todoActionCreator.completeTodo(this.props.todo._id);
  }

  render() {
    var task = <td>{this.props.todo.text}</td>;

    if (this.props.todo.completed === true) {
      task = <td><span className="task-completed">{this.props.todo.text}</span></td>;
    }

    return (
      <tr key={this.props.key}>
        {task}
        <td>
          <button disabled={this.props.todo.completed} onClick={this._completeTodo} type="button" className="btn btn-primary btn-sm">Completed</button>
        </td>
      </tr>
    );
  }
}