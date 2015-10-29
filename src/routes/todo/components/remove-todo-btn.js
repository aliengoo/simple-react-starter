"use strict";

import React, {Component, PropTypes} from 'react';

export default class RemoveTodoBtn extends Component {

  render() {
    const {inProgress, removeTodoClick, activeTodoId, todoBeingEdited, todo} = this.props;

    let klassName = `btn btn-danger btn-lg ${!!todoBeingEdited ? 'hide' : ''}`;

    let icon = <i className="fa fa-close"/>;

    var todoInProgress = inProgress && activeTodoId === todo._id;

    if (todoInProgress) {
      icon = <i className="fa fa-spinner fa-spin"/>;
    }

    return (
      <button
        disabled={todoInProgress}
        onClick={() => removeTodoClick(todo._id)}
        type="button"
        className={klassName}>{icon}</button>
    );
  }

}

RemoveTodoBtn.propTypes = {
  inProgress: PropTypes.bool,
  todoBeingEdited: PropTypes.object,
  removeTodoClick: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired,
  activeTodoId: PropTypes.string.isRequired
};
