"use strict";

import React from 'react';
import {connect} from 'react-redux';

// shared components
import NavBar from '../../../shared/nav-bar';
import Alert from '../../../shared/alert';
import PageHeader from '../../../shared/page-header';

// todo components
import TodoInput from '../components/todo-input';
import TodoList from '../components/todo-list';

// actions
import {findAllTodos} from '../actions/todo-find-all-actions';
import {addTodo} from '../actions/todo-add-todo-actions';
import {completeTodo} from '../actions/todo-complete-todo-actions';
import {removeTodo} from '../actions/todo-remove-todo-actions';
import {todoItemTextChanged} from '../actions/todo-item-text-changed-action';

class TodoControllerView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // when the container, or "smart" component loads, find all the todos
    this.props.dispatch(findAllTodos());
  }

  render() {
    const {dispatch, todos, inProgress, completingId, err, todoItemText} = this.props;

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
          Todo List
        </PageHeader>

        <div className="row">
          <div className="col-sm-12">
            <TodoInput
              onChange={(e) => dispatch(todoItemTextChanged(e.target.value))}
              addTodoClick={() => dispatch(addTodo(todoItemText))}
              inProgress={inProgress}
              todoItemText={todoItemText}/>
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
    todoItemText: state.todoItemText,
    todos: state.todos,
    inProgress: state.inProgress,
    completingId: state.completingId,
    err: state.err
  };
}

export default connect(select)(TodoControllerView);
