import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Breadcrumbs.scss';

class BreadcrumbItem extends Component {
  static propTypes = {
    name: PropTypes.string,
    isRoot: PropTypes.bool,
    subPath: PropTypes.string,
  };
  
  render() {
    const { isRoot, name, subPath, onBreadCrumbClick } = this.props;
    return (
      <div className={styles.item} onClick={() => onBreadCrumbClick(subPath)}>
        {isRoot ?
          <span className={cx('fas fa-home', styles.itemText )} /> :
          <span className={styles.itemText}>{name}</span>
        }
      </div>
    );
  }
}

export default BreadcrumbItem;
