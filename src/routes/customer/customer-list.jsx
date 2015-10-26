import React from 'react';
import request from 'superagent';
import CustomerItem from './customer-item';

export default class CustomerList extends React.Component {
  render() {
    return (
      <div className="customer-list">
        <ul>
          {this.props.customers.map((customer, index) => {
            return <CustomerItem key={index} customer={customer} onRemove={this.props.onRemove}/>
            })}
        </ul>
      </div>
    );
  }
}