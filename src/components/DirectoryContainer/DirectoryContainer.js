import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import File from 'components/File';
import DirectoryItem from 'components/DirectoryItem';
import styles from './DirectoryContainer.scss';

export default class MyComponent extends Component {
  static propTypes = {
    content: PropTypes.array,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.string,
  };
  
  selectItem = (event) => {
    event.stopPropagation();
    
    const { onItemSelect } = this.props;
    const { currentTarget } = event;
    let key = currentTarget ? currentTarget.getAttribute('data-key') : null;
    
    onItemSelect(key);
  };
  
  renderFile(fileObject, isSelected) {
    // we are not proccess files like file.txt.js for now
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
    const { onItemSelect, selectedItem } = this.props;
    
    return (
      <DirectoryItem
        name={name}
        childFiles={children}
        selected={isSelected}
        onItemSelect={onItemSelect}
        selectedItem={selectedItem}
      />
    );
  };
  
  
  render() {
    const { content, selectedItem } = this.props;
    
    return (
      <div className={styles.container}>
        {
          content.map((item, index) => {
            const key = JSON.stringify(item);
            const isSelected = key === selectedItem;
            
            return (
              <div
                className={styles.directoryItem}
                key={key}
                data-key={key}
                onClick={this.selectItem}
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
