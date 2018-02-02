import React, { Component } from 'react';
import {
  Route,
  Link
} from 'react-router-dom'

import SideNav from './SideNav';
import MainContainer from './MainContainer';
import reactApp from 'apps/react';
import reduxApp from 'apps/redux';
import mobxApp from 'apps/mobx';

import styles from './AppLayout.scss';

export default class AppLayout extends Component {
  render() {
    return (
      <div className={styles.container}>
        <SideNav>
          <Link to="/">Pure React app</Link>
          <Link to="/redux">Redux app</Link>
          <Link to="/mobx">Mobx app</Link>
        </SideNav>
        <MainContainer>
          <Route exact path="/" component={reactApp}/>
          <Route exact path="/redux" component={reduxApp}/>
          <Route exact path="/mobx" component={mobxApp}/>
        </MainContainer>
      </div>
    );
  }
}