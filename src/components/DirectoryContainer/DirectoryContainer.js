import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import File from 'components/File';
import DirectoryItem from 'components/DirectoryItem';
import styles from './DirectoryContainer.scss';

export default class MyComponent extends Component {
  static propTypes = {
    content: PropTypes.array,
    selectedItem: PropTypes.string,
    root: PropTypes.string,
    onItemSelect: PropTypes.func,
    onFolderDoubleClick: PropTypes.func,
    onItemRightButtonClick: PropTypes.func,
  };
  
  onItemClick = (event) => {
    event.stopPropagation();
    
    this.selectItem(event);
  };
  
  openContextMenu = (event) => {
    const { onItemRightButtonClick } = this.props;
    const { clientX: x, clientY: y } = event;
    onItemRightButtonClick({ position: { x, y } });
  };
  
  selectItem = (event, rightClick) => {
    const { onItemSelect } = this.props;
    const { currentTarget } = event;
    let key = currentTarget ? currentTarget.getAttribute('data-key') : null;
    
    onItemSelect(key, rightClick);
  };
  
  onItemRightButtonClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    
    this.selectItem(event, true);
    this.openContextMenu(event);
  };
  
  renderFile(fileObject, isSelected) {
    // we are not process files like file.txt.js for now
    const { name, extension, ...meta } = fileObject;
    return (
      <File
        name={name}
        extension={extension}
        meta={meta}
        selected={isSelected}
      />
    );
  }
  
  
  renderFolder(folderObject, isSelected) {
    const { name, children } = folderObject;
    const {
      onItemSelect,
      selectedItem,
      root,
      onFolderDoubleClick,
      onItemRightButtonClick
    } = this.props;
    
    // TODO Possibly think of transferring common props to context in order not to pass them via props recursively
    return (
      <DirectoryItem
        name={name}
        childFiles={children}
        selected={isSelected}
        onItemSelect={onItemSelect}
        root={root}
        selectedItem={selectedItem}
        onFolderDoubleClick={onFolderDoubleClick}
        onItemRightButtonClick={onItemRightButtonClick}
      />
    );
  };
  
  
  render() {
    const { content, selectedItem, root } = this.props;
    
    return (
      <div className={styles.container}>
        {
          content.map((item, index) => {
            const key = root === '/' ? `${root}${item.name}` : `${root}/${item.name}`;
            const isSelected = key === selectedItem;
            
            return (
              <div
                className={styles.directoryItem}
                key={key}
                data-key={key}
                onClick={this.onItemClick}
                onContextMenu={this.onItemRightButtonClick}
              >
                {get(item, 'children') ? this.renderFolder(item, isSelected) : this.renderFile(item, isSelected)}
              </div>
            )
            
          })
        }
      </div>
    );
  }
}
