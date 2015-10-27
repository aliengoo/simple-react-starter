"use strict";

import React, {Component, PropTypes} from 'react';
import InputGroup from '../../shared/input/input-group';
import InputGroupBtn from '../../shared/input/input-group-btn';

export default class TodoInput extends React.Component {

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }
  _onClick() {
    this.props.addTodoClick(this.refs.todoInput.value);
  }

  render() {
    const {inProgress} = this.props;

    var input = (<input
      disabled={inProgress}
      type="text"
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
            onClick={this._onClick}>Add
          </button>

        </InputGroupBtn>
      </InputGroup>
    );
  }
}

TodoInput.propTypes = {
  inProgress: PropTypes.bool,
  addTodoClick: PropTypes.func.isRequired
};