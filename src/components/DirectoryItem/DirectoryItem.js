import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import DirectoryContainer from 'components/DirectoryContainer';
import styles from './DirectoryItem.scss';

export default class DirectoryItem extends Component {
  constructor(props) {
    super(props);
    const { name, root } = props;
    this.nestedRoot = root ==='/' ? `${root}${name}`: `${root}/${name}`;
  }
  
  static propTypes = {
    childFiles: PropTypes.array,
    name: PropTypes.string,
    selected: PropTypes.bool,
    selectedItem: PropTypes.string,
    root: PropTypes.string,
    onItemSelect: PropTypes.func,
    onFolderDoubleClick: PropTypes.func,
    onItemRightButtonClick: PropTypes.func,
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
  
  folderDoubleClick = event => {
    event.stopPropagation();
    const { onFolderDoubleClick } = this.props;
    onFolderDoubleClick(this.nestedRoot);
  };
  
  render() {
    const { isOpen } = this.state;
    const {
      name,
      childFiles,
      selected,
      onItemSelect,
      selectedItem,
      onFolderDoubleClick,
      onItemRightButtonClick
    } = this.props;
    
    return (
      <Fragment>
        <div
          className={cx(styles.container, { [ styles.selected ]: selected })}
          onDoubleClick={this.folderDoubleClick}
        >
          {isOpen ?
            <span onClick={this.toggleOpen} className={`fas fa-caret-down ${styles.caret}`}/> :
            <span onClick={this.toggleOpen} className={`fas fa-caret-right ${styles.caret}`}/>}
          <span className={`far fa-folder ${styles.folder}`}/>
          <span className={styles.folderName}>{name}</span>
        </div>
        {isOpen ?
          <DirectoryContainer
            content={childFiles}
            selectedItem={selectedItem}
            root={this.nestedRoot}
            onFolderDoubleClick={onFolderDoubleClick}
            onItemSelect={onItemSelect}
            onItemRightButtonClick={onItemRightButtonClick}
          />
          : null}
      </Fragment>
    );
  }
}