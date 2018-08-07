import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Breadcrumbs.scss';

class BreadcrumbItem extends Component {
  static propTypes = {
    name: PropTypes.string,
  };
  
  render() {
    const { isRoot, name } = this.props;
    return (
      <div className={styles.item}>
        {isRoot ?
          <span className='fas fa-home' /> :
          <span>{name}</span>
        }
      </div>
    );
  }
}

export default BreadcrumbItem;
