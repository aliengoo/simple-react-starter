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
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  componentDidMount() {
    var chatMessages = this._getChatMessagesElement();

    if (chatMessages) {
      chatMessages.style.height = "500px";
    }
  }

  componentDidUpdate() {
    this._trackScroll();
  }

  render() {
    const {fetching, chatMessages, chatUser, chatUsers} = this.props;

    var content = <div></div>;

    if (chatUser && chatUser.name) {
      var items = (
        <div className="chat-messages-no-messages">
          No messages
        </div>
      );

      if (chatMessages && chatMessages.length > 0) {
        items = chatMessages.map((chatMessage, key) =>
          (<ChatMessage chatUsers={chatUsers} chatMessage={chatMessage} chatUser={chatUser} key={key}/>)
        );
      }

      content = (
        <div className="chat-messages" id="chat-messages">
          {items}
        </div>);
    }

    return content;
  }
}

ChatMessages.propTypes = {
  fetching: PropTypes.bool,
  chatUser: PropTypes.object,
  chatUsers: PropTypes.array,
  chatMessages: PropTypes.array
};