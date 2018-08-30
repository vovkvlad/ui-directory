import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FileInfoHeader from './FileInfoHeader';
import FileInfoMeta from './FileInfoMeta';
import styles from './ItemPreview.scss'

class ItemPreview extends Component {
  static propTypes = {
    selectedItem: PropTypes.object,
  };
  
  render() {
    const { selectedItem } = this.props;
    const { name, extension, ...other } = selectedItem;
    return (
      <div className={styles.container}>
        <FileInfoHeader name={name} extension={extension} />
        <FileInfoMeta meta={other}/>
      </div>
    );
  }
}

export default ItemPreview;
