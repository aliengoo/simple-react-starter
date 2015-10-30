"use strict";

import React, {Component, PropTypes} from 'react';
import ChatMessage from './chat-message';

export default class ChatMessages extends Component {
  render() {
    const {fetching, chatMessages, chatUsername} = this.props;

    var items = (
      <div className="chat-messages-no-messages">
        No messages
      </div>
    );

    if (chatMessages && chatMessages.length > 0) {

      console.log(chatMessages);
      items = chatMessages.map((chatMessage, key) =>
        (<ChatMessage chatMessage={chatMessage} chatUsername={chatUsername} key={key}/>)
      );
    }

    return (
      <div className="chat-messages">
        {items}
      </div>);
  }
}

ChatMessages.propTypes = {
  fetching: PropTypes.bool,
  chatUsername: PropTypes.string.isRequired,
  chatMessages: PropTypes.array
};