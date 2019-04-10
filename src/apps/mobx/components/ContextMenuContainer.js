import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { last } from 'lodash';

import { treeStore, contextMenuStore, modalStore } from 'apps/mobx/stores'
import ContextMenu from 'components/ContextMenu';


class ContextMenuContainer extends Component {
  contextMenuItems = () => {
    const selectedItemName = last(treeStore.selected.split('/'));
    
    return [
      {
        key: 'rename',
        label: `Rename ${selectedItemName}`,
        fn: () => {
          contextMenuStore.closeContextMenu();
          modalStore.openModal({ type: 'rename' })
        },
      },
      {
        key: 'remove',
        label: `Remove ${selectedItemName}`,
        fn: () => {
          contextMenuStore.closeContextMenu();
          modalStore.openModal({ type: 'remove' });
        },
      },
      {
        key: 'add',
        label: `Add new Item`,
        fn: () => {
          contextMenuStore.closeContextMenu();
          modalStore.openModal({ type: 'add' });
        },
      },
      {
        key: 'add-folder',
        label: `Add new Folder`,
        fn: () => {
          contextMenuStore.closeContextMenu();
          modalStore.openModal({ type: 'add-folder' });
        },
      }
    ];
  };
  
  render() {
    return contextMenuStore.display ? (
      <ContextMenu
        position={contextMenuStore.position}
        items={this.contextMenuItems()}
        selectedItem={treeStore.selected}
      />
    ) : null;
  }
}

export default observer(ContextMenuContainer);
