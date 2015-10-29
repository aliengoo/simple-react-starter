import React from 'react';

export default class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">{this.props.appName}</a>
          </div>
        </div>
      </nav>
    );
  }
}