import React from 'react';
import FormGroup from './form-group.jsx';
import ControlLabel from './control-label.jsx';

export default class TextInput extends React.Component {
  render() {

    if (!this.props.label) {
      this.props.label = "Shit, no label";
    }

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

TextInput.propTyopes = {
  placeholder: React.PropTypes.string,
  name: React.PropTypes.string,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func
};
