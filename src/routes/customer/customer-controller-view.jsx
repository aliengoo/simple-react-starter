import React from 'react';
import PageHeader from '../../shared/page-header.jsx';
import CustomerForm from './customer-form.jsx';
import CustomerList from './customer-list.jsx';
import CustomerActions from '../../actions/customer-actions';
import CustomerStore from '../../stores/customer-store';

class CustomerControllerView extends React.Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this._save = this._save.bind(this);
    this._remove = this._remove.bind(this);
    this.state = {
      form: {
        inProgress: false
      },
      customers: [],
      customer: {
        firstName: '',
        lastName: ''
      }
    };
  }

  _onChange(event) {
    var temp = this.state;
    temp.customer[event.target.name] = event.target.value;
    this.setState(temp);
  }

  findAll() {
    var self = this;

    self._customerApi.findAll().then(function (customers) {
      delete self.state.error;
      self.state.customers = customers;
    }, function (error) {
      self.state.error = error;
    }).finally(function () {
      self.setState(self.state);
    });

  }

  _save() {
    CustomerActions.saveCustomer(this.state.customer).then(() => {
      this.state.customers = CustomerStore.getAllCustomers();
    }, (err) => console.error(err)).finally(() => {
      this.setState(this.state);
    });
  }

  _remove(id) {
  }

  componentDidMount() {
    this.findAll();
  }

  render() {
    return (
      <div id="customer" className="container-fluid">
        <PageHeader>Customer</PageHeader>
        <CustomerForm onChange={this._onChange} onSave={this._save}/>
        <CustomerList customers={this.state.customers} onRemove={this._remove}/>
      </div>
    );
  }
}

export default CustomerControllerView;