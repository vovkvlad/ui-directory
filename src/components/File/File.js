import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
  };
  
  render() {
    const { name, extension } = this.props;
    return (
      <div className={styles.container}>
        <FileIcon extension={extension} />
        <span className={styles.name}>{`${name}.${extension}`}</span>
      </div>
    );
  }
}