"use strict";

import React, {Component, PropTypes} from 'react';

export default class ChatMessage extends Component {

  render() {
    const {chatMessage, chatUsername} = this.props;

    var usernameContent = (
      <span className="label label-info">
        {chatMessage.username}:
      </span>);

    if (chatUsername === chatMessage.username) {
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
  chatUsername: PropTypes.string.isRequired,
  chatMessage: PropTypes.object.isRequired
};