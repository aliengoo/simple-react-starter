"use strict";

import React, {Component, PropTypes} from 'react';
import TodoListItemControls from './todo-list-item-controls';
import $ from 'jquery';

import instance from '../store/todo-store';

export default class TodoListItem extends Component {

  constructor() {
    super();
    this.state = {
      ready: false
    };

    this._enableEdit = this._enableEdit.bind(this);
  }

  _enableEdit() {
    if (this.state.ready) {
      this.props.updateTodoStartedClick(this.props.todo);
    }
  }

  componentDidMount() {
    this.setState({
      ready: true
    });
  }

  render() {
    const {
      todo,
      removeTodoClick,
      updateTodoStartedClick,
      updateTodoAbortedClick,
      updateTodoCommitClick,
      updateTodoBeingEditedTextChanged,
      todoBeingEdited,
      completeTodoClick,
      uncompleteTodoClick,
      inProgress,
      activeTodoId} = this.props;

    var isBeingEdited = !!todoBeingEdited && todoBeingEdited._id === todo._id;


    var task = <div onClick={this._enableEdit}>{todo.text}</div>;

    if (todo.completed === true) {
      task = <div className="task-completed">{task}</div>;
    }

    if (isBeingEdited) {
      task = (<input
        ref="editTodoInput"
        defaultValue={todoBeingEdited.text}
        className="form-control input-lg"
        onChange={(e) => updateTodoBeingEditedTextChanged(e.target.value)}/>);
    }

    return (
      <div className="todo-list-item">
        <div className="todo-list-item-task">
          {task}
        </div>
        <TodoListItemControls
          updateTodoBeingEditedTextChanged={updateTodoBeingEditedTextChanged}
          updateTodoAbortedClick={updateTodoAbortedClick}
          updateTodoCommitClick={updateTodoCommitClick}
          completeTodoClick={completeTodoClick}
          uncompleteTodoClick={uncompleteTodoClick}
          removeTodoClick={removeTodoClick}
          todo={todo}
          todoBeingEdited={todoBeingEdited}
          inProgress={inProgress}
          activeTodoId={activeTodoId}
        />
      </div>
    );
  }
}

TodoListItem.propTypes = {
  todoBeingEdited: PropTypes.object,
  updateTodoBeingEditedTextChanged: PropTypes.func.isRequired,
  updateTodoStartedClick: PropTypes.func.isRequired,
  updateTodoCommitClick: PropTypes.func.isRequired,
  updateTodoAbortedClick: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired,
  activeTodoId: PropTypes.string,
  inProgress: PropTypes.bool,
  removeTodoClick: PropTypes.func.isRequired,
  completeTodoClick: PropTypes.func.isRequired,
  uncompleteTodoClick: PropTypes.func.isRequired
};
