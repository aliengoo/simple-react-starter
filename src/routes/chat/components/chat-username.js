"use strict";

import React, {Component, PropTypes} from 'react';
import InputGroup from '../../../shared/components/input-group';
import InputGroupBtn from '../../../shared/components/input-group-btn';

export default class ChatUsername extends Component {

  render() {
    const {fetching, setChatUsername} = this.props;

    return (
      <div>
        <InputGroup>
          <input type="text" className="form-control" maxLength={20}/>
          <InputGroupBtn>

            <button
              disabled={fetching}
              className="btn btn-primary btn-lg"
              type="button"
              onClick={setChatUsername}>Set my name
            </button>

          </InputGroupBtn>
        </InputGroup>
      </div>
    );
  }
}

ChatUsername.propTypes = {
  fetching: PropTypes.bool,
  setChatUsername: PropTypes.func.isRequired
};