"use strict";

import React from 'react';

class PageHeader extends React.Component {
  render() {
    return (
      <header>
        <h1>{this.props.children}</h1>
      </header>
    );
  }
}

export default PageHeader;