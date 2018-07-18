import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DIR } from './testDirectoryStructure';
import DirectoryContainer from 'components/DirectoryContainer';

export default class AppController extends Component {
  state = {
    selectedItem: null,
    directoryRoot: null
  };
  
  onItemSelect = key => {
    const { selectedItem } = this.state;
  
    const newSelectedItem = selectedItem === key ? null : key;
    this.setState({
      selectedItem: newSelectedItem
    });
  };
  
  
  render() {
    const { directoryRoot, selectedItem } = this.state;
    
    return (
      <DirectoryContainer
        content={DIR}
        onItemSelect={this.onItemSelect}
        selectedItem={selectedItem}
      />
    );
  }
}