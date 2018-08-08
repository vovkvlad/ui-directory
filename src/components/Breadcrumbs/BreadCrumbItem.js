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
    const { isRoot, name, subPath } = this.props;
    return (
      <div className={styles.item}>
        {isRoot ?
          <span className={cx('fas fa-home', styles.itemText )} data-sub-path={subPath} /> :
          <span className={styles.itemText} data-sub-path={subPath}>{name}</span>
        }
      </div>
    );
  }
}

export default BreadcrumbItem;
