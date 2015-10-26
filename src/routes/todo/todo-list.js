"use strict";

import React from 'react';
import TodoListItem from './todo-list-item';
import todoActionCreator from './actions/todo-action-creator';
import todoStore from './store/todo-store';

export default class TodoList extends React.Component {

  constructor() {
    super();
    this.state = {
      todos: []
    };

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    todoStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    todoStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      todos: todoStore.getTodos()
    });
  }

  render() {
    var rows = this.state.todos.map((todo) => <TodoListItem todo={todo} key={todo.key}/>);

    return (
        <table className="table table-bordered">
          <tbody>
            {rows}
          </tbody>
        </table>
    );
  }
}