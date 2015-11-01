"use strict";

import React, {Component, PropTypes} from 'react';
import InputGroup from '../../../shared/components/input-group';
import InputGroupBtn from '../../../shared/components/input-group-btn';

export default class ChatUsername extends Component {

  render() {
    const {fetching, chatUser, setChatUsername} = this.props;

    var content = (<div></div>);

    if (!chatUser || !chatUser.name) {
      content = (
        <div>
          <InputGroup>
            <input type="text" ref="usernameInput" className="form-control" maxLength={20} placeholder="Enter your username"/>
            <InputGroupBtn>

              <button
                disabled={fetching}
                className="btn btn-primary"
                type="button"
                onClick={() => setChatUsername(this.refs.usernameInput.value)}>Set
              </button>

            </InputGroupBtn>
          </InputGroup>
        </div>
      );
    }

    return content;
  }
}

ChatUsername.propTypes = {
  fetching: PropTypes.bool,
  chatUser: PropTypes.object,
  setChatUsername: PropTypes.func.isRequired
};