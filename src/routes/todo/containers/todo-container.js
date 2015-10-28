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
import ContainerFluid from '../../../shared/layout/container-fluid';
import Container from '../../../shared/layout/container';
import Col from '../../../shared/layout/col';
import Row from '../../../shared/layout/row';

// actions
import {findAllTodos} from '../actions/todo-find-all-actions';
import {addTodo} from '../actions/todo-add-todo-actions';
import {completeTodo} from '../actions/todo-complete-todo-actions';
import {removeTodo} from '../actions/todo-remove-todo-actions';
import {todoItemTextChanged} from '../actions/todo-item-text-changed-action';
import {uncompleteTodo} from '../actions/todo-uncomplete-todo-action';

class TodoContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // when the container, or "smart" component loads, find all the todos
    this.props.dispatch(findAllTodos());
  }

  render() {
    const {dispatch, todos, inProgress, activeTodoId, err, todoItemText} = this.props;

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
      <Container>
        <PageHeader>
          Todo List
        </PageHeader>

        <Row>
          <Col media="sm" grid="12">
            <TodoInput
              onChange={(e) => dispatch(todoItemTextChanged(e.target.value))}
              addTodoClick={() => dispatch(addTodo(todoItemText))}
              inProgress={inProgress}
              todoItemText={todoItemText}/>
          </Col>
        </Row>

        <Row>
          <Col media="sm" grid="12">
            <TodoList
              todos={todos}
              inProgress={inProgress}
              activeTodoId={activeTodoId}
              uncompleteTodoClick={(id) => dispatch(uncompleteTodo(id))}
              removeTodoClick={(id) => dispatch(removeTodo(id))}
              completeTodoClick={(id) => dispatch(completeTodo(id))}/>
          </Col>
        </Row>
        {alertError}
      </Container>
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
    activeTodoId: state.activeTodoId,
    err: state.err
  };
}

export default connect(select)(TodoContainer);
