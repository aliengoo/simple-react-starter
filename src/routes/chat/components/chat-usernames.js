"use strict";

import React, {Component, PropTypes} from 'react';

export default class ChatUsernames extends Component {
  render() {
    return (
      <div className="chat-usernames">
        {"chat-usernames"}
      </div>);
  }
}

ChatUsernames.propTypes = {
  fetching: PropTypes.bool,
  chatUsernames: PropTypes.array.isRequired,
  chatUsername: PropTypes.string.isRequired
};