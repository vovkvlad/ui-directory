import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ItemPreview.scss'

class ItemPreview extends Component {
  static propTypes = {
    selectedItem: PropTypes.object,
  };
  
  render() {
    return (
      <div className={styles.container}>
        AAAAA
      </div>
    );
  }
}

export default ItemPreview;
