import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import DirectoryContainer from 'components/DirectoryContainer';
import styles from './DirectoryItem.scss';

export default class DirectoryItem extends Component {
  static propTypes = {
    childFiles: PropTypes.array,
    name: PropTypes.string,
    selected: PropTypes.bool,
    selectedItem: PropTypes.string,
    onItemSelect: PropTypes.func,
  };
  
  static defaultProps = {
    childFiles: [],
  };
  
  state = {
    isOpen: false,
  };
  
  toggleOpen = (event) => {
    event.stopPropagation();
    const { isOpen } = this.state;
    
    this.setState({
      isOpen: !isOpen,
    });
  };
  
  render() {
    const { isOpen } = this.state;
    const { name, childFiles, selected, onItemSelect, selectedItem } = this.props;
    
    return (
      <Fragment>
        <div className={cx(styles.container, { [ styles.selected ]: selected })}>
          {isOpen ?
            <span onClick={this.toggleOpen} className={`fas fa-caret-down ${styles.caret}`}/> :
            <span onClick={this.toggleOpen} className={`fas fa-caret-right ${styles.caret}`}/>}
          <span className={`far fa-folder ${styles.folder}`}/>
          <span className={styles.folderName}>{name}</span>
        </div>
        {isOpen ?
          <DirectoryContainer
            content={childFiles}
            onItemSelect={onItemSelect}
            selectedItem={selectedItem}/>
          : null}
      </Fragment>
    );
  }
}