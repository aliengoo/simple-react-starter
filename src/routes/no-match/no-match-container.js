"use strict";

import React, {Component} from 'react';
import {Link} from 'react-router';

import NavBar from '../../shared/components/nav-bar';
import PageHeader from '../../shared/components/page-header';

import ContainerFluid from '../../shared/components/container-fluid';
import Container from '../../shared/components/container';
import Col from '../../shared/components/col';
import Row from '../../shared/components/row';

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
