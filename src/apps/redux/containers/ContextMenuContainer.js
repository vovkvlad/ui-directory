import React, { Component } from 'react';
import { connect } from 'react-redux';
import { last } from 'lodash';

import { getSelectedItem } from 'apps/redux/selectors/tree';
import { getContextMenu } from 'apps/redux/selectors/contextMenu';
import { openContextMenu, closeContextMenu } from 'apps/redux/actions/contextMenu'
import { openModal, closeModal } from 'apps/redux/actions/modal'
import ContextMenu from 'components/ContextMenu';


class ContextMenuContainer extends Component {
  contextMenuItems = () => {
    const { selectedItem, closeContextMenu, openModal } = this.props;
    const selectedItemName = last(selectedItem.split('/'));
    
    return [
      {
        key: 'rename',
        label: `Rename ${selectedItemName}`,
        fn: () => {
          closeContextMenu();
          openModal({ type: 'rename' })
        },
      },
      {
        key: 'remove',
        label: `Remove ${selectedItemName}`,
        fn: () => {
          closeContextMenu();
          openModal({ type: 'remove' });
        },
      },
      {
        key: 'add',
        label: `Add new Item`,
        fn: () => {
          closeContextMenu();
          openModal({ type: 'add' });
        },
      },
      {
        key: 'add-folder',
        label: `Add new Folder`,
        fn: () => {
          closeContextMenu();
          openModal({ type: 'add-folder' });
        },
      }
    ];
  };
  
  render() {
    const { display, selectedItem, position } = this.props;
    
    return display ? (
      <ContextMenu
        position={position}
        items={this.contextMenuItems()}
        selectedItem={selectedItem}
      />
    ) : null;
  }
}

const mapStateToProps = (state, ownProps) => {
  const selectedItem = getSelectedItem(state);
  const { display, position } = getContextMenu(state);
  
  return {
    selectedItem,
    display,
    position,
  };
};

const mapDispatchToProps = {
  openContextMenu,
  closeContextMenu,
  openModal,
  closeModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenuContainer);