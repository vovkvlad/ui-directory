import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import File from 'components/File';
import DirectoryItem from 'components/DirectoryItem';
import styles from './DirectoryContainer.scss';

export default class MyComponent extends Component {
  static propTypes = {
    content: PropTypes.array
  };
  
  renderFile(fileObject) {
    // we are not proccess files like file.txt.js for now
    const { name, extension, ...meta } = fileObject;
    return (
      <File
        name={name}
        extension={extension}
        meta={meta}
        key={`${name}.${extension}`}
      />
    );
  }
  
  
  renderFolder(folderObject) {
    const { name, children } = folderObject;
    
    return <DirectoryItem name={name} content={children} key={name}/>;
  };
  
  render() {
    const { content } = this.props;
    
    return (
      <div className={styles.container}>
        {content.map(item => get(item, 'children') ? (
            <div className={styles[ "directory-item" ]}>
              {this.renderFolder(item)}
            </div>
          ) : (
            <div className={styles[ "directory-item" ]}>{this.renderFile(item)}</div>
          )
        )}
      </div>
    );
  }
}
