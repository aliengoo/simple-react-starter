"use strict";

import React, {Component, PropTypes} from 'react';

export default class ChatMessages extends Component {
  render() {
    return (
      <div className="chat-messages">

      </div>);
  }
}

ChatMessages.propTypes = {
  fetching: PropTypes.bool,
  chatMessages: PropTypes.array.isRequired
};