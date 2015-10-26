import React from 'react';
import PageHeader from '../../shared/page-header.jsx';

class HomeControllerView extends React.Component {
  render() {
    return (
      <div id="home" className="container">
        <PageHeader>Home</PageHeader>
      </div>
    );
  }
}

export default HomeControllerView;