"use strict";

import React, {Component, PropTypes} from 'react';

export default class TodoRemoveBtn extends Component {

  render() {
    const {inProgress, removeTodoClick, activeTodoId, todo} = this.props;

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
        className="btn btn-danger">{icon}</button>
    );
  }

}

TodoRemoveBtn.propTypes = {
  inProgress: PropTypes.bool,
  removeTodoClick: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired,
  activeTodoId: PropTypes.string.isRequired
};
