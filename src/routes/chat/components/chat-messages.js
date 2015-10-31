"use strict";

import React, {Component, PropTypes} from 'react';
import ChatMessage from './chat-message';

export default class ChatMessages extends Component {

  constructor() {
    super();
    this._trackScroll = this._trackScroll.bind(this);
    this._getChatMessagesElement = this._getChatMessagesElement.bind(this);
  }

  _getChatMessagesElement() {
    return document.getElementById("chat-messages");
  }

  _trackScroll() {
    var chatMessages = this._getChatMessagesElement();
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  componentDidMount() {
    var chatMessages = this._getChatMessagesElement();
    chatMessages.style.height = "500px";
  }

  componentDidUpdate() {
    this._trackScroll();
  }

  render() {
    const {fetching, chatMessages, chatUsername} = this.props;

    var items = (
      <div className="chat-messages-no-messages">
        No messages
      </div>
    );

    if (chatMessages && chatMessages.length > 0) {
      items = chatMessages.map((chatMessage, key) =>
        (<ChatMessage chatMessage={chatMessage} chatUsername={chatUsername} key={key}/>)
      );
    }

    return (
      <div className="chat-messages" id="chat-messages">
        {items}
      </div>);
  }
}

ChatMessages.propTypes = {
  fetching: PropTypes.bool,
  chatUsername: PropTypes.string.isRequired,
  chatMessages: PropTypes.array
};