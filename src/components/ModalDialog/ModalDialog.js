import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './ModalDialog.scss'

export default class ModalDialog extends Component {
  static propTypes = {
    type: PropTypes.string,
    selectedItemName: PropTypes.string,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
  };
  
  getHeaderText() {
    const { type, selectedItemName } = this.props;
    switch (type) {
      case 'rename':
        return <span className={styles.modalHeaderText}>{`Rename ${selectedItemName}`}</span>;
      case 'add':
        return <span className={styles.modalHeaderText}>{`Add New Item`}</span>;
      default:
        return 'Generic Header';
    }
  }
  
  renderModal() {
    
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.modalHeader}>
            {this.getHeaderText()}
            <span className={cx(styles.modalCrossButton, 'fas fa-times')}/>
          </div>
          <div className={styles.modalFormBody}>
            <input type="text"/>
          </div>
          <div className={styles.modalFooterButtons}>
            <button type='button' onClick={() => {
            }}>Cancel
            </button>
            <button type='button' onClick={() => {
            }}>Ok
            </button>
          </div>
        </div>
      </div>
    
    );
  }
  
  render() {
    let mainContainer = document.getElementById('main-container');
    
    return ReactDOM.createPortal(this.renderModal(), mainContainer);
  }
}