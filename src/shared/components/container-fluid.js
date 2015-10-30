"use strict";

import React, {Component} from 'react';

export default class ContainerFluid extends Component {
  render() {
    return <div className="container-fluid">{this.props.children}</div>;
  }
}

