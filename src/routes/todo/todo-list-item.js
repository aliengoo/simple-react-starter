"use strict";

import React from 'react';
import todoActionCreator from './actions/todo-action-creator';
import todoStore from './store/todo-store';

export default class TodoListItem extends React.Component {

  constructor() {
    super();

    this.state = {
      inProgress: false
    };

    this._onChange = this._onChange.bind(this);
    this._completeTodo = this._completeTodo.bind(this);
  }

  componentWillMount() {
    todoStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    todoStore.removeChangeListener(this._onChange);
  }

  _completeTodo() {
    todoActionCreator.completeTodo(this.props.todo._id);
  }

  _onChange() {
    this.setState({
      inProgress: todoStore.getInProgress(),
      completingId: todoStore.getCompletingId()
    });
  }

  render() {
    var task = <td>{this.props.todo.text}</td>;

    if (this.props.todo.completed === true) {
      task = <td><span className="task-completed">{this.props.todo.text}</span></td>;
    }

    var content = <span>Completed</span>;

    if (this.state.inProgress && this.props.todo._id === this.state.completingId) {
      content = <span>Completing...</span>;
    }

    return (
      <tr key={this.props.key}>
        {task}
        <td>
          <button
            disabled={this.props.todo.completed}
            onClick={this._completeTodo}
            type="button"
            className="btn btn-primary btn-sm">{content}</button>
        </td>
      </tr>
    );
  }
}