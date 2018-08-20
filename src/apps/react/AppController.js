import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { compact, get } from 'lodash';

import { DIR } from './testDirectoryStructure';
import DirectoryContainer from 'components/DirectoryContainer';
import BreadCrumbs from 'components/Breadcrumbs';
import ItemPreview from 'components/ItemPreview';

import styles from './app.scss';

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
    const { history: { push }, match: { url } } = this.props;
    
    push(`${url}${folderPath}`)
  };
  
  getItemByPath = (path) => {
    const subDirectories = compact(path.split('/'));
    let currentItem = DIR;
    
    subDirectories.forEach((subDirectory, index, array) => {
      const subDirectoryResult = currentItem.find(item => item.name === subDirectory);
      
      if (!subDirectoryResult) {
        throw new Error(`There is no such directory or file as ${subDirectory}`);
      } else {
        // if this is the last one - we need to return it as is as it might be a file - otherwise
        // it is definitely subfolder and we need to go deeper
        if (index === array.length - 1) {
          currentItem = subDirectoryResult;
        } else {
          currentItem = subDirectoryResult.children;
        }
      }
      
    });
    
    const children = get(currentItem, 'children');
    
    return children || currentItem;
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
    const { history: { push }, match: { url } } = this.props;
    
    push(`${url}${folderPath === '/' ? '' : folderPath}`);
  };
  
  
  render() {
    const { selectedItem } = this.state;
    const { root } = this.props;
    
    const content = this.getItemByPath(root);
    const selected = selectedItem && this.getItemByPath(selectedItem);
    
    return (
      <Fragment>
        <BreadCrumbs
          path={root}
          onBreadcrumbClick={this.onBreadcrumbClick}
        />
        <DirectoryContainer
          content={content || content.children}
          selectedItem={selectedItem}
          root={root}
          onItemSelect={this.onItemSelect}
          onFolderDoubleClick={this.onFolderDoubleClick}
        />
        <ItemPreview
          selectedItem={selected}
        />
      </Fragment>
    );
  }
}

export default withRouter(AppController);