"use strict";

import React, {Component, PropTypes} from 'react';

export default class TodoCompleteBtn extends Component {
  render() {
    const {inProgress, completeTodoClick, todo, activeTodoId} = this.props;

    let klassName = `btn btn-success ${todo.completed ? 'hide' : ''}`;

    let icon = <i className="fa fa-check"/>;

    var todoInProgress = inProgress && activeTodoId === todo._id;

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

TodoCompleteBtn.propTypes = {
  inProgress: PropTypes.bool,
  activeTodoId: PropTypes.string,
  completeTodoClick: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired
};