import React from 'react';
import TextInput from '../../shared/input/text-input';

export default class CustomerForm extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <form name="customerForm" className="col-sm-12">

        <div className="row">

          <div className="col-sm-6">
            <TextInput label="First name" onChange={this.props.onChange} placeholder="First name" name="firstName"/>
            <TextInput label="Middle names" onChange={this.props.onChange} placeholder="Middle names"
                       name="middleNames"/>
            <TextInput label="Last name" onChange={this.props.onChange} placeholder="Last name" name="lastName"/>
          </div>

          <div className="col-sm-6">
            <p>Nothing</p>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <button onClick={this.props.onSave} className="btn btn-primary" type="button">Save</button>
          </div>
        </div>
      </form>
    );
  }
}

CustomerForm.propTypes = {
  onChange: React.PropTypes.func,
  onSave: React.PropTypes.func
};