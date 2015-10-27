"use strict";

import React, {Component, PropTypes} from 'react';

export default class TodoRemoveBtn extends Component {

  render() {
    const {inProgress, removeTodoClick, todoId} = this.props;

    return (<button
      disabled={inProgress}
      onClick={() => removeTodoClick(todoId)}
      type="button"
      className="btn btn-danger btn-sm">Remove</button>);
  }

}

TodoRemoveBtn.propTypes = {
  inProgress: PropTypes.bool,
  removeTodoClick: PropTypes.func.isRequired,
  todoId: PropTypes.string.isRequired
};
