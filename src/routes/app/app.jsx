import React from 'react';
import NavBar from '../../shared/nav-bar.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar appName="simple-react-starter"/>
        {this.props.children}
      </div>
    );
  }
}