"use strict";

import React from 'react';
import InputGroup from '../../shared/input/input-group';
import InputGroupBtn from '../../shared/input/input-group-btn';

import todoActionCreator from './actions/todo-action-creator';
import todoStore from './store/todo-store';

export default class TodoInput extends React.Component {

  constructor() {
    super();
    this.state = {
      inProgress: false
    };
    this._onChange = this._onChange.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  componentWillMount() {
    todoStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    todoStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    var inProgress = todoStore.getInProgress();

    // assume the process completed
    if (!inProgress) {
      this.refs.todoInput.value = '';
    }

    this.setState({
      inProgress: inProgress
    });
  }

  _onClick() {
    todoActionCreator.addTodo(this.refs.todoInput.value);
  }

  render() {
    return (
        <InputGroup>

          <input
            disabled={this.state.inProgress}
            type="text"
            className="form-control input-lg"
            placeholder="Enter your todo here..."
            ref="todoInput"/>

          <InputGroupBtn>

            <button
              disabled={this.state.inProgress}
              className="btn btn-primary btn-lg"
              type="button"
              onClick={this._onClick}>Add</button>

          </InputGroupBtn>
        </InputGroup>
    );
  }
}