"use strict";

import React, {Component, PropTypes} from 'react';
import InputGroup from '../../../shared/input/input-group';
import InputGroupBtn from '../../../shared/input/input-group-btn';
import instance from '../store/todo-store';

export default class TodoInput extends React.Component {

  componentDidMount() {
    var store = instance();

    store.subscribe(() => {
      var state = store.getState();

      if (state.todoItemText !== this.refs.todoInput.value) {
        this.refs.todoInput.value = state.todoItemText;
      }
    });
  }

  render() {
    const {onChange, inProgress, addTodoClick} = this.props;

    var input = (<input
      disabled={inProgress}
      type="text"
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
  onChange: PropTypes.func.isRequired,
  todoItemText: PropTypes.string,
  inProgress: PropTypes.bool,
  addTodoClick: PropTypes.func.isRequired
};
