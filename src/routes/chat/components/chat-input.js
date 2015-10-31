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
    return (
      <div className="chat-input">
        <input className="form-control" onKeyDown={this._onKeyDown} ref="chatInput" maxLength="140" placeholder="Say something..."/>
      </div>);
  }
}

ChatInput.propTypes = {
  fetching: PropTypes.bool,
  sendMessage: PropTypes.func.isRequired
};