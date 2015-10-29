"use strict";

import React, {Component, PropTypes} from 'react';
import TodoListItem from './todo-list-item';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class TodoList extends Component {

  render() {
    const {
      refreshTodo,
      todos,
      todoBeingEdited,
      removeTodoClick,
      uncompleteTodoClick,
      completeTodoClick,
      updateTodoBeingEditedTextChanged,
      updateTodoStartedClick,
      updateTodoCommitClick,
      updateTodoAbortedClick,
      inProgress,
      activeTodoId} = this.props;

    var items = todos.map((todo, key) =>
      (<TodoListItem
        key={key}
        todo={todo}
        updateTodoBeingEditedTextChanged={updateTodoBeingEditedTextChanged}
        updateTodoAbortedClick={updateTodoAbortedClick}
        updateTodoStartedClick={updateTodoStartedClick}
        updateTodoCommitClick={updateTodoCommitClick}
        removeTodoClick={removeTodoClick}
        completeTodoClick={completeTodoClick}
        uncompleteTodoClick={uncompleteTodoClick}
        inProgress={inProgress}
        todoBeingEdited={todoBeingEdited}
        activeTodoId={activeTodoId}/>));

    return (
      <div className="todo-list">
        <ReactCSSTransitionGroup transitionName="todo-list-item" transitionEnterTimeout={1500}
                                 transitionLeaveTimeout={1300}>
          {items}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  todoBeingEdited: PropTypes.object,
  updateTodoBeingEditedTextChanged: PropTypes.func.isRequired,
  updateTodoStartedClick: PropTypes.func.isRequired,
  updateTodoCommitClick: PropTypes.func.isRequired,
  updateTodoAbortedClick: PropTypes.func.isRequired,
  removeTodoClick: PropTypes.func.isRequired,
  completeTodoClick: PropTypes.func.isRequired,
  uncompleteTodoClick: PropTypes.func.isRequired,
  inProgress: PropTypes.bool,
  activeTodoId: PropTypes.string
};