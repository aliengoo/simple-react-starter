"use strict";

import React, {Component, PropTypes} from 'react';

export default class UncompleteTodoBtn extends Component {
  render() {
    const {inProgress, uncompleteTodoClick, todo, todoBeingEdited, activeTodoId} = this.props;

    let klassName = `btn btn-default btn-lg ${todo.completed && !(!!todoBeingEdited) ? '' : 'hide'}`;

    let icon = <i className="fa fa-undo"/>;

    var todoInProgress = inProgress && activeTodoId === todo._id;

    if (todoInProgress) {
      icon = <i className="fa fa-spinner fa-spin"/>;
    }

    return (
      <button
        disabled={todoInProgress}
        onClick={() => uncompleteTodoClick(todo._id)}
        type="button"
        className={klassName}>{icon}</button>
    );
  }
}

UncompleteTodoBtn.propTypes = {
  inProgress: PropTypes.bool,
  todoBeingEdited: PropTypes.object,
  activeTodoId: PropTypes.string,
  uncompleteTodoClick: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired
};