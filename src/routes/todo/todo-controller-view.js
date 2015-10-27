"use strict";

import React from 'react';
import NavBar from '../../shared/nav-bar';
import PageHeader from '../../shared/page-header';
import TodoInput from './todo-input';
import TodoList from './todo-list';
import Alert from '../../shared/alert';
import {connect} from 'react-redux';

import {findAllTodos} from './actions/todo-find-all-actions';
import {addTodo} from './actions/todo-add-todo-actions';
import {completeTodo} from './actions/todo-complete-todo-actions';

class TodoControllerView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(findAllTodos());
  }

  render() {
    const {dispatch, todos, inProgress, completingId, err} = this.props;

    var alertError = <div></div>;

    if (err) {
      alertError =
        (<div className="row">
          <Alert alertType="danger">
            {err}
          </Alert>
        </div>);
    }

    return (
      <div className="container" id="todo">
        <PageHeader>
          Todo list
        </PageHeader>

        <div className="row">
          <div className="col-sm-12">
            <TodoInput addTodoClick={(text) => dispatch(addTodo(text))} inProgress={inProgress}/>
            <hr/>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <TodoList
              todos={todos}
              inProgress={inProgress}
              completingId={completingId}
              completeTodoClick={(id) => dispatch(completeTodo(id))}/>
          </div>
        </div>
        {alertError}
      </div>
    );
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {

  return {
    todos: state.todos,
    inProgress: state.inProgress,
    completingId: state.completingId,
    err: state.err
  };
}

export default connect(select)(TodoControllerView);