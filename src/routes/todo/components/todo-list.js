"use strict";

import React, {Component, PropTypes} from 'react';
import TodoListItem from './todo-list-item';

export default class TodoList extends Component {

  render() {
    const {todos, removeTodoClick, completeTodoClick, inProgress, completingId} = this.props;

    return (
      <ul className="todo-list">
        {todos.map((todo, key) =>
          (<TodoListItem
            key={key}
            todo={todo}
            removeTodoClick={removeTodoClick}
            completeTodoClick={completeTodoClick}
            inProgress={inProgress}
            completingId={completingId}/>))}
      </ul>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  removeTodoClick: PropTypes.func.isRequired,
  completeTodoClick: PropTypes.func.isRequired,
  inProgress: PropTypes.bool,
  completingId: PropTypes.string
};