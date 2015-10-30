"use strict";

import React from 'react';
import {connect} from 'react-redux';

import {getSocket} from '../../shared/api/socket';

// shared components
import NavBar from '../../shared/components/nav-bar';
import PageHeader from '../../shared/components/page-header';
import ContainerFluid from '../../shared/components/container-fluid';
import Container from '../../shared/components/container';
import Col from '../../shared/components/col';
import Row from '../../shared/components/row';

// chat components
import ChatUsernames from './components/chat-usernames';
import ChatInput from './components/chat-input';
import ChatMessages from './components/chat-messages';

// actions
import ChatActions from './actions/chat-actions';

const {
  SendMessageAction,
  SendMessageActionBroadcastAction,
  UserConnectedActionBroadcastAction,
  UserDisconnectedActionBroadcastAction
  } = ChatActions;

// actions

class ChatContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    var socket = getSocket();

    socket.on("SendMessageActionBroadcastAction", (response) => {
      this.props.dispatch(SendMessageActionBroadcastAction.create(response.data));
    });

    // these broadcast events are not related to an action, but a side-effect
    // of connecting to the websocket server
    socket.on("UserConnectedActionBroadcastAction", (response) => {
      this.props.dispatch(UserConnectedActionBroadcastAction.create(response.data));
    });

    socket.on("UserDisconnectedActionBroadcastAction", (response) => {
      this.props.dispatch(UserDisconnectedActionBroadcastAction.create(response.data));
    });
  }

  render() {
    const {
      dispatch,
      chatMessages,
      chatUsername,
      chatUsernames,
      fetching,
      err} = this.props;

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
      <div>
        <NavBar appName="simple-react-starter"/>
        <ContainerFluid>
          <PageHeader>
            Chat room
          </PageHeader>

          <div className="chat-parent">
            <ChatUsernames chatUsernames={chatUsernames} chatUsername={chatUsername} fetching={fetching}/>

            <div className="chat-content">
              <ChatMessages chatMessages={chatMessages} fetching={fetching} chatUsername={chatUsername}/>

              <ChatInput sendMessage={(message) => dispatch(SendMessageAction.create(message))} fetching={fetching}/>
            </div>
          </div>

          {alertError}
        </ContainerFluid>
      </div>
    );
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {

  return {
    chatMessages: state.chatMessages,
    chatUsername: state.chatUsername,
    chatUsernames: state.chatUsernames,
    fetching: state.fetching,
    err: state.err
  };
}

export default connect(select)(ChatContainer);
