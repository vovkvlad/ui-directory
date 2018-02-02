import React, { Component } from 'react';

import styles from './AppLayout.scss';

export default class SideNav extends Component {
  render() {
    const { children } = this.props;
    
    return (
      <nav className={styles.sideNav}>
        <ul className={styles.sideNavList}>
          {
            React.Children.toArray(children).map((child, index) => {
              return (
                <li
                  key={index}
                  className={styles.sideNavLinkElement}
                >
                  {child}
                </li>
              );
            })
          }
        </ul>
      </nav>
    );
  }
}