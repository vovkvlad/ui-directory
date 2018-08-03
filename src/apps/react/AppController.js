import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { DIR } from './testDirectoryStructure';
import DirectoryContainer from 'components/DirectoryContainer';

class AppController extends Component {
  static propTypes = {
    root: PropTypes.string.isRequired
  };
  
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
    const { history: { push }, match: { url }} = this.props;
    console.log('========================');
    console.log(folderPath);
    console.log('========================');
  
    //push(`/${url}${folderPath}`)
  };
  
  getContentByPath = (path) => {
  };
  
  
  render() {
    const { selectedItem } = this.state;
    const { root } = this.props;
  
    return (
      <DirectoryContainer
        content={DIR}
        selectedItem={selectedItem}
        root={root}
        onItemSelect={this.onItemSelect}
        onFolderDoubleClick={this.onFolderDoubleClick}
      />
    );
  }
}

export default withRouter(AppController);