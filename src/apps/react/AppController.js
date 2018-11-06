import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { compact, get, cloneDeep, set } from 'lodash';

import { DIR } from './testDirectoryStructure';
import DirectoryContainer from 'components/DirectoryContainer';
import BreadCrumbs from 'components/Breadcrumbs';
import ItemPreview from 'components/ItemPreview';
import ContextMenu from 'components/ContextMenu';

import styles from './app.scss';

class AppController extends Component {
  static propTypes = {
    root: PropTypes.string.isRequired
  };
  
  state = {
    selectedItem: null,
    fileTree: DIR,
    contextMenu: {
      display: false,
      position: { x: 0, y: 0 },
    },
  };
  
  onItemSelect = key => {
    const { selectedItem } = this.state;
    
    const newSelectedItem = selectedItem === key ? null : key;
    this.setState({
      selectedItem: newSelectedItem,
      contextMenu: {
        display: false,
      }
    });
  };
  
  onFolderDoubleClick = folderPath => {
    const { history: { push }, match: { url } } = this.props;
    
    push(`${url}${folderPath}`)
  };
  
  getItemByPath = (path) => {
    const subDirectories = compact(path.split('/'));
    let currentItem = this.state.fileTree;
    
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
    
    return currentItem;
  };
  
  constructGetterPath = (path, tree) => {
    const subDirectories = compact(path.split('/'));
    let currentItem = this.state.fileTree;
    let getterPath = '';
    
    subDirectories.forEach((subDirectory, index, array) => {
      const subDirectoryResultIndex = currentItem.findIndex(item => item.name === subDirectory);
      
      if (subDirectoryResultIndex === -1) {
        throw new Error(`There is no such directory or file as ${subDirectory}`);
      } else {
        getterPath += `[${subDirectoryResultIndex}]`;
        if (index !== array.length - 1) {
          currentItem = currentItem[ subDirectoryResultIndex ].children;
          getterPath += '.children';
        }
      }
      
    });
    
    return getterPath;
  };
  
  onBreadcrumbClick = folderPath => {
    const { history: { push }, match: { url } } = this.props;
    
    push(`${url}${folderPath === '/' ? '' : folderPath}`);
  };
  
  onItemCreate = ({ path, name, extension, isFile }) => {
    const { fileTree } = this.state;
    const destination = this.getItemByPath(path);
    const existingChildren = get(destination, 'children');
    if (!existingChildren) {
      throw new Error('You can create something only inside directory');
    }
    
    const newItem = isFile ?
      { name, extension } : { name, children: [] };
    
    const newChildren = [ ...existingChildren, newItem ];
    // I know this is bad, but I ran myself into pitfall :/
    const newTree = set(cloneDeep(fileTree), this.constructGetterPath(path).children, newChildren);
    this.setState({
      fileTree: newTree,
    });
  };
  
  onItemRightButtonClick = ({ position }) => {
    this.setState({
      contextMenu: {
        display: true,
        position,
      }
    });
  };
  
  
  render() {
    const { selectedItem, fileTree, contextMenu } = this.state;
    const { root } = this.props;
    const { display: showContextMenu, position } = contextMenu;
    
    console.log('========================');
    console.log(this.constructGetterPath('Folder2/Folder3/File11', fileTree));
    console.log('========================');
    
    const content = this.getItemByPath(root);
    const selected = selectedItem && this.getItemByPath(selectedItem);
    
    /*return (
      <ContextMenu
        position={{x: 200, y:20}}
        items={[]}
      />
    );*/
    
    return (
      <Fragment>
        <BreadCrumbs
          path={root}
          onBreadcrumbClick={this.onBreadcrumbClick}
        />
        <DirectoryContainer
          content={get(content, 'children') || content}
          selectedItem={selectedItem}
          root={root}
          onItemSelect={this.onItemSelect}
          onFolderDoubleClick={this.onFolderDoubleClick}
          onItemRightButtonClick={this.onItemRightButtonClick}
        />
        {selectedItem && <ItemPreview selectedItem={selected}/>}
        {showContextMenu && (
          <ContextMenu
            position={position}
            items={[]}
          />
        )}
      </Fragment>
    );
  }
}

export default withRouter(AppController);