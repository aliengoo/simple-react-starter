"use strict";

import React from 'react';
import {connect} from 'react-redux';
import {getSocket} from '../../../shared/socket';

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
import FindAllTodosAction from '../actions/find-all-todos-action';
import AddTodoAction from '../actions/add-todo-action';
import CompleteTodoAction from '../actions/complete-todo-action';
import RemoveTodoAction from '../actions/remove-todo-action';
import TodoItemTextChangedAction from '../actions/todo-item-text-changed-action';
import UncompleteTodoAction from '../actions/uncomplete-todo-action';
import UpdateTodoCommitAction from '../actions/update-todo-commit-action';
import UpdateTodoStartedAction from '../actions/update-todo-started-action';
import UpdateTodoAbortedAction from '../actions/update-todo-aborted-action';
import UpdateTodoBeingEditedTextAction from '../actions/update-todo-being-edited-text-action';

class TodoContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // when the container, or "smart" component loads, find all the todos
    this.props.dispatch(FindAllTodosAction.findAllTodos());
  }

  render() {
    const {
      dispatch,
      todoBeingEdited,
      todoBeingEditedPriorState,
      todos,
      inProgress,
      activeTodoId,
      err,
      todoItemText} = this.props;

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
              onChange={(e) => dispatch(TodoItemTextChangedAction.create(e.target.value))}
              addTodoClick={() => dispatch(AddTodoAction.create(todoItemText))}
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
              todoBeingEdited={todoBeingEdited}
              updateTodoBeingEditedTextChanged={(newText) => dispatch(UpdateTodoBeingEditedTextAction.create(newText))}
              updateTodoAbortedClick={() => dispatch(UpdateTodoAbortedAction.create(todoBeingEditedPriorState))}
              updateTodoCommitClick={() => dispatch(UpdateTodoCommitAction.create(todoBeingEdited))}
              updateTodoStartedClick={(todo) => dispatch(UpdateTodoStartedAction.create(todo))}
              uncompleteTodoClick={(id) => dispatch(UncompleteTodoAction.create(id))}
              removeTodoClick={(id) => dispatch(RemoveTodoAction.create(id))}
              completeTodoClick={(id) => dispatch(CompleteTodoAction.create(id))}/>
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
    socket: state.socket,
    todoItemText: state.todoItemText,
    todoBeingEdited: state.todoBeingEdited,
    todoBeingEditedPriorState: state.todoBeingEditedPriorState,
    todos: state.todos,
    inProgress: state.inProgress,
    activeTodoId: state.activeTodoId,
    err: state.err
  };
}

export default connect(select)(TodoContainer);
