import React from 'react';
import FormGroup from './form-group.jsx';
import ControlLabel from './control-label.jsx';

export default class TextInput extends React.Component {
  render() {
    return (
      <FormGroup>
        <ControlLabel>{this.props.label}</ControlLabel>
        <input
          type="text"
          onChange={this.props.onChange}
          placeholder={this.props.placeholder}
          className="form-control"
          name={this.props.name}/>
      </FormGroup>
    );
  }
}

TextInput.propTypes = {
  placeholder: React.PropTypes.string,
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func
};
