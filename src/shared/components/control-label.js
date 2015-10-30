import React from 'react';

export default class ControlLabel extends React.Component {
  render() {
    return (
      <label className="control-label">
        {this.props.children}
      </label>);
  }
}