import React from 'react';

class ControlLabel extends React.Component {
  render() {
    return (
      <label className="control-label">
        {this.props.children}
      </label>);
  }
}

export default ControlLabel;