"use strict";

import React, {Component, PropTypes} from 'react';
import InputGroup from '../../../shared/input/input-group';
import InputGroupBtn from '../../../shared/input/input-group-btn';
import instance from '../store/todo-store';

export default class TodoInput extends React.Component {

  constructor() {
    super();
    this._resetFocus = this._resetFocus.bind(this);
  }

  componentWillUnmount() {
    let store = instance();

    store.unsubscribe(this._stateChanged.bind(this));
  }

  componentDidMount() {
    let store = instance();

    store.subscribe(this._stateChanged.bind(this));
  }

  _stateChanged() {
    let store = instance();

    var state = store.getState();

    if (state.todoItemText !== this.refs.todoInput.value) {
      this.refs.todoInput.value = state.todoItemText;
    }
  }

  componentDidUpdate() {
    this._resetFocus();
  }

  /**
   * Handle the user hitting enter - this fires an addTodoClick if there is anything in the todoInput.
   * @param e - the keyDown event
   * @private - internal function
   */
  _onKeyDown(e) {
    if (e.keyCode === 13 && (this.refs.todoInput.value || "").length > 0) {
      this.props.addTodoClick();
    }
  }

  _resetFocus() {
    if (!(!!this.props.todoBeingEdited)) {
      this.refs.todoInput.focus();
    }
  }

  render() {
    const {onChange, inProgress, addTodoClick} = this.props;

    var input = (<input
      name="todo-input"
      disabled={inProgress}
      type="text"
      onKeyDown={this._onKeyDown.bind(this)}
      onChange={onChange}
      className="form-control input-lg"
      placeholder="Enter your todo here..."
      ref="todoInput"/>);

    return (
      <InputGroup>
        {input}
        <InputGroupBtn>

          <button
            disabled={inProgress}
            className="btn btn-primary btn-lg"
            type="button"
            onClick={addTodoClick}>Add
          </button>

        </InputGroupBtn>
      </InputGroup>
    );
  }
}

TodoInput.propTypes = {
  todoBeingEdited: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  todoItemText: PropTypes.string,
  inProgress: PropTypes.bool,
  addTodoClick: PropTypes.func.isRequired
};
