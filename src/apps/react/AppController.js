import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { compact } from 'lodash';

import { DIR } from './testDirectoryStructure';
import DirectoryContainer from 'components/DirectoryContainer';
import BreadCrumbs from 'components/Breadcrumbs';

class AppController extends Component {
  static propTypes = {
    root: PropTypes.string.isRequired
  };
  
  state = {
    selectedItem: null,
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
  
    push(`${url}${folderPath}`)
  };
  
  getContentByPath = (path) => {
    const subDirectories = compact(path.split('/'));
    let currentDir = DIR;
    
    subDirectories.forEach(subDirectory => {
      const subDirectoryResult = currentDir.find(item => item.name === subDirectory);
      
      if (!subDirectoryResult) {
        throw new Error(`There is no such directory as ${subDirectory}`);
      } else {
        currentDir = subDirectoryResult.children;
      }
    });
    
    return currentDir;
  };
  
  onBreadcrumbClick = folderPath => {
    const { history: { push }, match: { url }} = this.props;
    
    push(`${url}${folderPath === '/' ? '' : folderPath}`);
  };
  
  
  render() {
    const { selectedItem } = this.state;
    const { root } = this.props;
    
    const content = this.getContentByPath(root);
  
    return (
      <Fragment>
        <BreadCrumbs
          path={root}
          onBreadcrumbClick={this.onBreadcrumbClick}
        />
        <DirectoryContainer
          content={content}
          selectedItem={selectedItem}
          root={root}
          onItemSelect={this.onItemSelect}
          onFolderDoubleClick={this.onFolderDoubleClick}
        />
      </Fragment>
    );
  }
}

export default withRouter(AppController);