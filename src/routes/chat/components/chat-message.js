"use strict";

import React, {Component, PropType} from 'react';

export default class ChatMessage extends Component {

  render() {
    return (
      <div className="chat-message">
        {"Chat message here"}
      </div>
    );
  }
}

ChatMessage.propTypes = {
  chatMessage: PropType.object.isRequired
};