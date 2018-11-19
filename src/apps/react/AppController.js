import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { compact, get, cloneDeep, set, last } from 'lodash';

import { DIR } from './testDirectoryStructure';
import DirectoryContainer from 'components/DirectoryContainer';
import BreadCrumbs from 'components/Breadcrumbs';
import ItemPreview from 'components/ItemPreview';
import ContextMenu from 'components/ContextMenu';
import ModalDialog from 'components/ModalDialog';
import { constructGetterPath } from 'utils/constructGetterPath';
import { getItemByPath } from 'utils/getItemByPath';
import { renameItem } from 'utils/renameItem';
import { addItemToTree } from 'utils/addNewItemToTree';

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
    modal: {
      display: false,
      type: null,
    }
  };
  
  onItemSelect = (key, rightClick) => {
    const { selectedItem } = this.state;
    
    if (rightClick) {
      // no need to set state if nothing changed
      if (selectedItem !== key) {
        this.setState({
          selectedItem: key,
        });
      }
    } else {
      const newSelectedItem = selectedItem === key ? null : key;
      this.setState({
        selectedItem: newSelectedItem,
        contextMenu: {
          display: false,
        },
      });
    }
  };
  
  onFolderDoubleClick = folderPath => {
    const { history: { push }, match: { url } } = this.props;
    
    push(`${url}${folderPath}`)
  };
  
  onBreadcrumbClick = folderPath => {
    const { history: { push }, match: { url } } = this.props;
    
    push(`${url}${folderPath === '/' ? '' : folderPath}`);
  };
  
  onItemCreate = ({ path, name, extension, isFile }) => {
    const { fileTree } = this.state;
    const destination = getItemByPath(fileTree, path);
    const existingChildren = get(destination, 'children');
    if (!existingChildren) {
      throw new Error('You can create something only inside directory');
    }
    
    const newItem = isFile ?
      { name, extension } : { name, children: [] };
    
    const newChildren = [ ...existingChildren, newItem ];
    // I know this is bad, but I ran myself into pitfall :/
    const newTree = set(cloneDeep(fileTree), constructGetterPath(path, fileTree).children, newChildren);
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
  
  contextMenuItems = () => {
    const { selectedItem } = this.state;
    const selectedItemName = last(selectedItem.split('/'));
    
    return [
      {
        key: 'rename',
        label: `Rename ${selectedItemName}`,
        fn: () => {
          this.setState({
            contextMenu: {
              display: false,
            },
            modal: {
              display: true,
              type: 'rename'
            }
          });
        },
      },
      {
        key: 'remove',
        label: `Remove ${selectedItemName}`,
        fn: () => {
        },
      },
      {
        key: 'add',
        label: `Add new Item`,
        fn: () => {
          this.setState({
            contextMenu: {
              display: false,
            },
            modal: {
              display: true,
              type: 'add'
            }
          });
        },
      },
      {
        key: 'add-folder',
        label: `Add new Folder`,
        fn: () => {
          this.setState({
            contextMenu: {
              display: false,
            },
            modal: {
              display: true,
              type: 'add-folder'
            }
          });
        },
      }
    ];
  };
  
  openModalDialog = () => {
    const { modal: { type }, selectedItem, fileTree } = this.state;
    const selectedItemName = selectedItem ? last(selectedItem.split('/')) : '';
    
    const closeModalDialog = () => {
      this.setState({ modal: { display: false } })
    };
    let onSubmit;
    
    switch (type) {
      case 'rename':
        onSubmit = (value) => {
          this.setState({
            fileTree: renameItem(fileTree, selectedItem, value),
            selectedItem: null,
            modal: {
              display: true
            }
          });
        };
        break;
      case 'add':
        onSubmit = (value) => {
          const newTree = addItemToTree(fileTree, selectedItem, value);
          
          this.setState({
            fileTree: newTree,
            selectedItem: null,
            modal: {
              display: true
            }
          });
        };
        break;
      case 'add-folder':
        onSubmit = (value) => {
          const newTree = addItemToTree(fileTree, selectedItem, value, true);
    
          this.setState({
            fileTree: newTree,
            selectedItem: null,
            modal: {
              display: true
            }
          });
        };
        break;
      default:
        return null;
    }
    
    return (
      <ModalDialog
        type={type}
        selectedItemName={selectedItemName}
        onClose={closeModalDialog}
        onSubmit={onSubmit}
      />
    );
  };
  
  
  render() {
    const { selectedItem, fileTree, contextMenu, modal } = this.state;
    const { root } = this.props;
    const { display: showContextMenu, position } = contextMenu;
    const { display: showModal } = modal;
    
    /*console.log('========================');
    console.log(constructGetterPath('Folder2/Folder3/File11', fileTree));
    console.log('========================');*/
    
    const content = getItemByPath(fileTree, root);
    const selected = selectedItem && getItemByPath(fileTree, selectedItem);
    
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
            items={this.contextMenuItems()}
            selectedItem={selectedItem}
          />
        )}
        {showModal && (
          this.openModalDialog()
        )}
      </Fragment>
    );
  }
}

export default withRouter(AppController);