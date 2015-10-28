"use strict";

import React, {Component, PropTypes} from 'react';

export default class TodoUncompleteBtn extends Component {
  render() {
    const {inProgress, uncompleteTodoClick, todo, activeTodoId} = this.props;

    let klassName = `btn btn-default ${todo.completed ? '' : 'hide'}`;

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

TodoUncompleteBtn.propTypes = {
  inProgress: PropTypes.bool,
  activeTodoId: PropTypes.string,
  uncompleteTodoClick: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired
};