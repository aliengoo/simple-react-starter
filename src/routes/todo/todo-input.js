"use strict";

import React from 'react';
import InputGroup from '../../shared/input/input-group';
import InputGroupBtn from '../../shared/input/input-group-btn';

import todoActionCreator from './actions/todo-action-creator';
import todoStore from './store/todo-store';

export default class TodoInput extends React.Component {

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }

  componentWillMount() {
    todoStore.addChangeListener(() => {
      this.refs.todoInput.value = '';
    });
  }

  _onClick() {
    todoActionCreator.addTodo(this.refs.todoInput.value);
  }

  render() {
    return (
      <div>
        <InputGroup>
          <input type="text" className="form-control input-lg" placeholder="Enter your todo here..." ref="todoInput"/>
          <InputGroupBtn>
            <button className="btn btn-primary btn-lg" type="button" onClick={this._onClick}>Add</button>
          </InputGroupBtn>
        </InputGroup>
      </div>
    );
  }
}