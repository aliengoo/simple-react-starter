"use strict";

import React, {Component, PropTypes} from 'react';

export default class UpdateTodoCommitBtn extends Component {

  render() {
    const {fetching, todoBeingEdited, updateTodoCommitClick, todo, activeTodoId} = this.props;

    var isBeingEdited = todoBeingEdited && todoBeingEdited._id === todo._id;

    let klassName = `btn btn-success btn-lg ${isBeingEdited ? '' : 'hide'}`;

    let icon = <i className="fa fa-cloud-upload"/>;

    var todoInProgress = fetching && activeTodoId === todo._id;

    if (todoInProgress) {
      icon = <i className="fa fa-spinner fa-spin"/>;
    }

    return (
      <button
        disabled={todoInProgress}
        onClick={() => updateTodoCommitClick(todo)}
        type="button"
        className={klassName}>{icon}</button>
    );
  }
}

UpdateTodoCommitBtn.propTypes = {
  fetching: PropTypes.bool,
  activeTodoId: PropTypes.string,
  todo: PropTypes.object.isRequired,
  todoBeingEdited: PropTypes.object,
  updateTodoCommitClick: PropTypes.func.isRequired
};