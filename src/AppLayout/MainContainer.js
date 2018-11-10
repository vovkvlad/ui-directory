import React, { Component } from 'react';

import styles from './AppLayout.scss';

export default class MainContainer extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.mainAppContainer} id="main-container" >
        { children }
      </div>
    );
  }
}