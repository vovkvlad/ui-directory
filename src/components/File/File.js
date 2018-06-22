import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import FileIcon from 'components/FileIcon';
import styles from './File.scss';

export default class File extends Component {
  
  state = {
    isLoading: true
  };
  
  static propTypes = {
    extension: PropTypes.string,
    name: PropTypes.string,
    meta: PropTypes.object,
    selected: PropTypes.bool,
  };
  
  render() {
    const { name, extension, selected } = this.props;
    return (
      <div className={cx(styles.container, {[styles.selected]: selected})}>
        <FileIcon extension={extension} />
        <span className={styles.name}>{`${name}.${extension}`}</span>
      </div>
    );
  }
}