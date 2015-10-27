"use strict";

import React, {Component, PropTypes} from 'react';

export default class TodoCompletedBtn extends Component {
  render() {
    const {inProgress, completeTodoClick, todo, completingId} = this.props;

    var content = todo.complete ? "Completed" : "Complete";

    if (inProgress && completingId === todo._id) {
        content = "Completing..."
    }

    return (<button
      disabled={todo.completed || inProgress}
      onClick={() => completeTodoClick(todo._id)}
      type="button"
      className="btn btn-primary btn-sm">{content}</button>);
  }
}

TodoCompletedBtn.propTypes = {
  inProgress: PropTypes.bool,
  completingId: PropTypes.string,
  completeTodoClick: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired
};