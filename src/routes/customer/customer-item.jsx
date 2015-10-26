import React from 'react';

export default class CustomerItem extends React.Component {

  constructor() {
    super();
    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    this.props.onRemove(this.props.customer._id);
  }

  render() {
    return (
      <li key={this.props.key}>
        <span>{this.props.customer.lastName}, {this.props.customer.firstName} </span>
        <button type="button" className="btn btn-danger btn-sm" onClick={this._onClick}>Delete</button>
      </li>
    );
  }
}