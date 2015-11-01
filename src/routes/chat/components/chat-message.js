"use strict";

import _ from 'lodash';
import React, {Component, PropTypes} from 'react';

export default class ChatMessage extends Component {

  render() {
    const {chatMessage, chatUser, chatUsers} = this.props;

    var chatMessageUser = _.find(chatUsers, {
      socketId: chatMessage.socketId
    });

    var usernameContent = (
      <span className="label label-info">
        {chatMessageUser.name}:
      </span>);

    if (chatUser.socketId === chatMessage.socketId) {
      usernameContent = (
        <span className="label label-warning">
          Me:
        </span>);
    }
    return (
      <div className="chat-message">
        {usernameContent}
        <span className="chat-message-message">{chatMessage.message}</span>
      </div>
    );
  }
}

ChatMessage.propTypes = {
  chatUser: PropTypes.object.isRequired,
  chatUsers: PropTypes.array.isRequired,
  chatMessage: PropTypes.object.isRequired
};