"use strict";

import React, {Component, PropTypes} from 'react';

export default class UpdateTodoAbortBtn extends Component {

  render() {
    const {
      fetching,
      updateTodoAbortedClick,
      todoBeingEdited,
      todo,
      activeTodoId } = this.props;

    var isBeingEdited = todoBeingEdited && todoBeingEdited._id === todo._id;

    let klassName = `btn btn-danger btn-lg ${isBeingEdited ? '' : 'hide'}`;

    let icon = <i className="fa fa-recycle"/>;

    var todoInProgress = fetching && activeTodoId === todo._id;

    if (todoInProgress) {
      icon = <i className="fa fa-spinner fa-spin"/>;
    }

    return (
      <button
        disabled={todoInProgress}
        onClick={() => updateTodoAbortedClick(todo)}
        type="button"
        className={klassName}>{icon}</button>
    );
  }
}

UpdateTodoAbortBtn.propTypes = {
  fetching: PropTypes.bool,
  activeTodoId: PropTypes.string,
  todo: PropTypes.object.isRequired,
  todoBeingEdited: PropTypes.object,
  updateTodoAbortedClick: PropTypes.func.isRequired
};