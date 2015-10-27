"use strict";

import React, {Component, PropTypes} from 'react';
import TodoListItem from './todo-list-item';

export default class TodoList extends Component {

  render() {

    const {todos, completeTodoClick, inProgress, completingId} = this.props;


    return (
        <table className="table table-bordered">
          <tbody>
            {todos.map(function(todo, key) {
              return (<TodoListItem
                key={key}
                todo={todo}
                completeTodoClick={completeTodoClick}
                inProgress={inProgress}
                completingId={completingId} />);
            })}
          </tbody>
        </table>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  completeTodoClick: PropTypes.func.isRequired,
  inProgress: PropTypes.bool,
  completingId: PropTypes.string
};