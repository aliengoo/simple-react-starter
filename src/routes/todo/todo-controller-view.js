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
import {removeTodo} from './actions/todo-remove-todo-actions';
import {newItemTextChanged} from './actions/todo-new-item-text-changed-action';

class TodoControllerView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(findAllTodos());
  }

  render() {
    const {dispatch, todos, inProgress, completingId, err, newItemText} = this.props;

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
          Todo listsdwefwef
        </PageHeader>

        <div className="row">
          <div className="col-sm-12">
            <TodoInput
              onChange={(e) => dispatch(newItemTextChanged(e.target.value))}
              addTodoClick={() => dispatch(addTodo(newItemText))}
              inProgress={inProgress}
              newItemText={newItemText}/>
            <hr/>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <TodoList
              todos={todos}
              inProgress={inProgress}
              completingId={completingId}
              removeTodoClick={(id) => dispatch(removeTodo(id))}
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
    newItemText: state.newItemText,
    todos: state.todos,
    inProgress: state.inProgress,
    completingId: state.completingId,
    err: state.err
  };
}

export default connect(select)(TodoControllerView);