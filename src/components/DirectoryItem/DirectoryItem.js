import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './DirectoryItem.scss';

export default class DirectoryItem extends Component {
  static propTypes = {
    childFiles: PropTypes.array,
    name: PropTypes.string,
  };
  
  static defaultProps = {
    childFiles: [],
  };
  
  state = {
    isOpen: false,
  };
  
  toggleOpen = () => {
    const { isOpen } = this.state;
    
    this.setState({
      isOpen: !isOpen,
    });
  };
  
  render() {
    const { isOpen } = this.state;
    const { name } = this.props;
    
    return (
      <div onClick={this.toggleOpen}>
        {isOpen ? <span className={`fas fa-caret-down ${styles.caret}`}/> :
          <span className={`fas fa-caret-right ${styles.caret}`}/>}
        <span className={`far fa-folder ${styles.folder}`}/>
        <span className={styles.folderName}>{name}</span>
        {isOpen ? <span>Not ready yet</span> : null}
      </div>
    );
  }
}