import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compact } from 'lodash';

import BreadCrumbItem from './BreadCrumbItem';
import Delimiter from './BreadCrumbDelimiter';
import styles from './Breadcrumbs.scss';

class Breadcrumbs extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    onBreadcrumbClick: PropTypes.func.isRequired,
  };
  
  render() {
    const { path, onBreadcrumbClick } = this.props;
    const folders = compact(path.split('/'));
    
    folders.unshift('/');
    let subPath = '';
    
    return (
      <div
        className={styles.container}
      >
        {
          folders.map(( folder, index, array )=> {
            subPath += folder;
            if ((index !== array.length -1) && (index !== 0)) {
              subPath += '/';
            }
            return (
              <Fragment key={subPath}>
                <BreadCrumbItem
                  name={folder}
                  subPath={subPath}
                  isRoot={folder === '/'}
                  onBreadCrumbClick={onBreadcrumbClick}
                />
                {index === array.length - 1 ? null : <Delimiter />}
              </Fragment>
            );
          })
        }
      </div>
    );
  }
}

export default Breadcrumbs;
