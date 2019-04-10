import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash'
import { observer } from 'mobx-react';

import { getItemByPath } from 'utils/getItemByPath';
import { treeStore, contextMenuStore } from 'apps/mobx/stores';

import DirectoryContainer from 'components/DirectoryContainer';

class DirectoryTreeContainer extends Component {
  static propTypes = {
    root: PropTypes.string.isRequired,
    onFolderDoubleClick: PropTypes.func.isRequired,
  };
  
  onItemSelect = (key, rightClick) => {
    if (rightClick) {
      // no need to set state if nothing changed
      if (treeStore.selected !== key) {
        treeStore.selectItem(key);
      }
    } else {
      const newSelectedItem = treeStore.selected === key ? null : key;
      treeStore.selectItem(newSelectedItem);
      contextMenuStore.closeContextMenu()
      // closeContextMenu();
    }
  };
  
  render() {
    const {
      // selectedItem,
      // content,
      root,
      onFolderDoubleClick,
      // openContextMenu
    } = this.props;
  
    const content = getItemByPath(treeStore.tree, root);
    
    return (
      <DirectoryContainer
        content={get(content, 'children') || content}
        selectedItem={treeStore.selected}
        root={root}
        onItemSelect={this.onItemSelect}
        onFolderDoubleClick={onFolderDoubleClick}
        onItemRightButtonClick={contextMenuStore.openContextMenu}
      />
    );
  }
}

export default observer(DirectoryTreeContainer);
