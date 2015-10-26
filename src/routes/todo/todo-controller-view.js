"use strict";

import React from 'react';
import NavBar from '../../shared/nav-bar';
import PageHeader from '../../shared/page-header';
import TodoInput from './todo-input';
import TodoList from './todo-list';
import Alert from '../../shared/alert';

import todoActionCreator from './actions/todo-action-creator';
import todoStore from './store/todo-store';

export default class TodoControllerView extends React.Component {

  constructor() {
    super();
    this.state = {
      err: undefined,
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

  componentDidMount() {
    todoActionCreator.findAllTodos();
  }

  _onChange() {
    this.setState({
      err: todoStore.getErr(),
      todos: todoStore.getTodos()
    });
  }

  render() {
    var alertError = <div></div>;

    if (this.state.err) {
      alertError =
        (<div className="row">
          <Alert alertType="danger">
            {this.state.err}
          </Alert>
        </div>);
    }

    return (
      <div className="container" id="todo">

        <PageHeader>
          Todo list
        </PageHeader>

        <div className="row">
          <TodoInput/>
        </div>

        <div className="row">
          <TodoList todos={this.state.todos}/>
        </div>
        {alertError}
      </div>
    );
  }
}