import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DIR } from './testDirectoryStructure';
import DirectoryContainer from 'components/DirectoryContainer';

export default class AppController extends Component {
  state = {
    selectedItem: null,
    directoryRoot: '/'
  };
  
  onItemSelect = key => {
    const { selectedItem } = this.state;
  
    const newSelectedItem = selectedItem === key ? null : key;
    this.setState({
      selectedItem: newSelectedItem
    });
  };
  
  onFolderDoubleClick = folderPath => {
    console.log('========================');
    console.log(folderPath);
    console.log('========================');
  };
  
  
  render() {
    const { directoryRoot, selectedItem } = this.state;
  
    return (
      <DirectoryContainer
        content={DIR}
        selectedItem={selectedItem}
        root={directoryRoot}
        onItemSelect={this.onItemSelect}
        onFolderDoubleClick={this.onFolderDoubleClick}
      />
    );
  }
}