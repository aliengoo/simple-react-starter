"use strict";

import _ from 'lodash';
import React, {Component, PropTypes} from 'react';

export default class ChatUsernames extends Component {
  render() {
    const {fetching, chatUsers, chatUser} = this.props;

    if (chatUser && chatUser.name) {
      var filteredChatUsers = _.filter(chatUsers, (item) => item.name !== chatUser.name);

      if (filteredChatUsers.length > 0) {
        return (
          <div className="chat-usernames">
            {filteredChatUsers.map((item, key) => {
              return <div key={key}>{item.name}</div>;
            })}
          </div>);
      } else {
        return (
          <div className="chat-usernames-only-you">
            <span className="text-muted">No one else is here</span>
          </div>);
      }

    } else {
      return (<div></div>);
    }
  }
}

ChatUsernames.propTypes = {
  fetching: PropTypes.bool,
  chatUsers: PropTypes.array,
  chatUser: PropTypes.object
};