import React, { Component } from 'react';
import {
  Route,
  NavLink
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
          <NavLink
            exact={true}
            to="/"
            activeClassName={styles.activeSideNavLink}
            className={styles.sideNavLink}>
            Pure react app
          </NavLink>
          <NavLink
            to="/redux"
            activeClassName={styles.activeSideNavLink}
            className={styles.sideNavLink}>
            Redux app
          </NavLink>
          <NavLink
            to="/mobx"
            activeClassName={styles.activeSideNavLink}
            className={styles.sideNavLink}>
            Mobx app
          </NavLink>
        </SideNav>
        <MainContainer>
          <Route exact path="/" component={reactApp}/>
          <Route path="/redux" component={reduxApp}/>
          <Route path="/mobx" component={mobxApp}/>
        </MainContainer>
      </div>
    );
  }
}