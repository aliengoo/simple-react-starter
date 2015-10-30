"use strict";

import React, {Component} from 'react';
import {Link} from 'react-router';

import NavBar from '../../../shared/nav-bar';
import PageHeader from '../../../shared/page-header';

import ContainerFluid from '../../../shared/layout/container-fluid';
import Container from '../../../shared/layout/container';
import Col from '../../../shared/layout/col';
import Row from '../../../shared/layout/row';

class NoMatchContainer extends Component {

  render() {
    return (
      <div>
        <NavBar appName="simple-react-starter"/>
        <Container>
          <header className="jumbotron text-center">
            <h1>404 NOT FOUND</h1>
            <p>
              Go to <Link to={'todo'}>Todo</Link>
            </p>
          </header>

        </Container>
      </div>
    );
  }
}

export default NoMatchContainer;
