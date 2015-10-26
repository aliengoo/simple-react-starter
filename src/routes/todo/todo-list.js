"use strict";

import React from 'react';
import TodoListItem from './todo-list-item';
import todoActionCreator from './actions/todo-action-creator';
import todoStore from './store/todo-store';
import _ from 'lodash';

export default class TodoList extends React.Component {

  render() {
    return (
      <div className="col-sm-12">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Task</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {this.props.todos.map(function(todo){
            return (
              <TodoListItem todo={todo} key={todo.key}/>
            );
          })}
          </tbody>
        </table>
      </div>
    );
  }

}