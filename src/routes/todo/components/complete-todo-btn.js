"use strict";

import React, {Component, PropTypes} from 'react';

export default class CompleteTodoBtn extends Component {
  render() {
    const {fetching, completeTodoClick, todo, todoBeingEdited, activeTodoId} = this.props;

    let klassName = `btn btn-success  btn-lg ${todo.completed || !!todoBeingEdited ? 'hide' : ''}`;

    let icon = <i className="fa fa-check"/>;

    var todoInProgress = fetching && activeTodoId === todo._id;

    if (todoInProgress) {
      icon = <i className="fa fa-spinner fa-spin"/>;
    }

    return (
      <button
        disabled={todoInProgress}
        onClick={() => completeTodoClick(todo._id)}
        type="button"
        className={klassName}>{icon}</button>
    );
  }
}

CompleteTodoBtn.propTypes = {
  todoBeingEdited: PropTypes.object,
  fetching: PropTypes.bool,
  activeTodoId: PropTypes.string,
  completeTodoClick: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired
};