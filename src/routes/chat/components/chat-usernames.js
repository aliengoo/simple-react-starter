"use strict";

import React, {Component, PropTypes} from 'react';

export default class ChatUsernames extends Component {
  render() {
    const {fetching, chatUsernames, chatUsername} = this.props;
    return (
      <div className="chat-usernames">
        {chatUsernames.map((item, key) => {
          return <div key={key}>{item}</div>;
        })}
      </div>);
  }
}

ChatUsernames.propTypes = {
  fetching: PropTypes.bool,
  chatUsernames: PropTypes.array.isRequired,
  chatUsername: PropTypes.string.isRequired
};