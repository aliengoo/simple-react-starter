"use strict";

import React, {Component, PropTypes} from 'react';

class PageHeader extends React.Component {
  render() {

    var klassName = this.props.align === 'center' ? 'text-center' : '';

    return (
      <header className={klassName}>
        <h1>{this.props.children}</h1>
      </header>
    );
  }
}

PageHeader.propTypes = {
  align: PropTypes.string
};

export default PageHeader;