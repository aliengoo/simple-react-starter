"use strict";

import React from 'react';

export default class InputGroupBtn extends React.Component {
  render() {
    return (
      <span className="input-group-btn">
        {this.props.children}
      </span>
    );
  }
}