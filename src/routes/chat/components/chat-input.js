"use strict";

import React, {Component, PropTypes} from 'react';

export default class ChatInput extends Component {

  constructor() {
    super();

    this._onKeyDown = this._onKeyDown.bind(this);
  }

  _onKeyDown(e) {
    var val = this.refs.chatInput.value;

    if (e.keyCode === 13 && (val || "").length > 0) {
      this.props.sendMessage(val);
      this.refs.chatInput.value = "";
    }
  }

  render() {
    const {chatUser} = this.props;

    var content = (<div></div>);

    if (chatUser && chatUser.name) {
      content = (
        <div className="chat-input">
          <input className="form-control" onKeyDown={this._onKeyDown} ref="chatInput" maxLength="140" placeholder="Say something..."/>
        </div>);
    }

    return content;
  }
}

ChatInput.propTypes = {
  fetching: PropTypes.bool,
  chatUser: PropTypes.object,
  sendMessage: PropTypes.func.isRequired
};