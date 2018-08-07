import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compact } from 'lodash';

import BreadCrumbItem from './BreadCrumbItem';
import Delimiter from './BreadCrumbDelimiter';
import styles from './Breadcrumbs.scss';

class Breadcrumbs extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
  };
  
  render() {
    const { path } = this.props;
    const subPaths = compact(path.split('/'));
    
    subPaths.unshift('/');
    
    return (
      <div className={styles.container}>
        {
          subPaths.map(( subPathItem, index, array )=> {
            return (
              <Fragment key={subPathItem}>
                <BreadCrumbItem
                  name={subPathItem}
                  isRoot={subPathItem === '/'}
                />
                {index === array.length - 1 ? null : <Delimiter />}
              </Fragment>
            );
          })}
      </div>
    );
  }
}

export default Breadcrumbs;
