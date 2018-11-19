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
  
  state = {
    inputValue: this.props.types === 'rename' ? this.props.selectedItemName : '',
  };
  
  onInputChange = (event) => {
    this.setState({
      inputValue: event.target.value
    });
  };
  
  getHeaderText() {
    const { type, selectedItemName } = this.props;
    switch (type) {
      case 'rename':
        return <span className={styles.modalHeaderText}>{`Rename ${selectedItemName}`}</span>;
      case 'add':
        return <span className={styles.modalHeaderText}>{`Add New Item`}</span>;
      case 'add-folder':
        return <span className={styles.modalHeaderText}>{`Add New Folder`}</span>;
      case 'remove':
        return <span className={styles.modalHeaderText}>{`Are you sure you want to remove it?`}</span>;
      default:
        return 'Generic Header';
    }
  }
  
  onOkClick = () => {
    const { inputValue } = this.state;
    const { onSubmit } = this.props;
    
    onSubmit(inputValue);
  };
  
  renderModal() {
    const { onClose, type } = this.props;
    const { inputValue } = this.state;
    
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.modalHeader}>
            {this.getHeaderText()}
            <span className={cx(styles.modalCrossButton, 'fas fa-times')} onClick={onClose}/>
          </div>
          {
            type !== 'remove' && (
              <div className={styles.modalFormBody}>
                <input type="text" value={inputValue} onChange={this.onInputChange}/>
              </div>
            )
          }
          <div className={styles.modalFooterButtons}>
            <button type='button' onClick={onClose}>Cancel</button>
            <button type='button' onClick={this.onOkClick}>Ok</button>
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