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
import AsyncActions from '../actions/async-actions';
import SyncActions from '../actions/sync-actions';
import BroadcastActions from '../actions/broadcast-actions';

const {
  AddTodoAction,
  CompleteTodoAction,
  UncompleteTodoAction,
  RemoveTodoAction,
  UpdateTodoCommitAction,
  GetAllTodosAction,
  } = AsyncActions;

const {
  UpdateTodoStartedAction,
  UpdateTodoAbortedAction,
  UpdateTodoBeingEditedTextAction,
  TodoItemTextChangedAction,
  } = SyncActions;

const {
  AddTodoActionBroadcastAction,
  UpdateTodoCommitActionBroadcastAction,
  RemoveTodoActionBroadcastAction,
  CompleteTodoActionBroadcastAction,
  UncompleteTodoActionBroadcastAction
  } = BroadcastActions;

// actions

class TodoContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    var socket = getSocket();

    socket.on("AddTodoAction:broadcast", (response) => {
      this.props.dispatch(AddTodoActionBroadcastAction.create(response.data));
    });

    socket.on("UpdateTodoCommitAction:broadcast", (response) => {
     this.props.dispatch(UpdateTodoCommitActionBroadcastAction.create(response.data));
    });

    socket.on("RemoveTodoAction:broadcast", (response) => {
      this.props.dispatch(RemoveTodoActionBroadcastAction.create(response.data));
    });

    socket.on("CompleteTodoAction:broadcast", (response) => {
      this.props.dispatch(CompleteTodoActionBroadcastAction.create(response.data));
    });

    socket.on("UncompleteTodoAction:broadcast", (response) => {
      this.props.dispatch(UncompleteTodoActionBroadcastAction.create(response.data));
    });
  }

  componentDidMount() {
    // when the container, or "smart" component loads, find all the todos
    this.props.dispatch(GetAllTodosAction.create({}));
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
              todoBeingEdited={todoBeingEdited}
              onChange={(e) => dispatch(TodoItemTextChangedAction.create(e.target.value))}
              addTodoClick={() => dispatch(AddTodoAction.create({
                text: todoItemText
              }))}
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
