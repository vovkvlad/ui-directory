import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { last } from 'lodash';

import ModalDialog from 'components/ModalDialog';
import { treeStore, modalStore } from 'apps/mobx/stores'

class ModalDialogContainer extends Component {
  
  getOnSubmitHandler = () => {
    let onSubmit;
    
    switch (modalStore.type) {
      case 'rename':
        onSubmit = (value) => {
          treeStore.renameItem({ value });
          modalStore.closeModal();
        };
        break;
      case 'add':
        onSubmit = (value) => {
          treeStore.addNewFile({ value });
          modalStore.closeModal();
        };
        break;
      case 'add-folder':
        onSubmit = (value) => {
          treeStore.addDirectory({ value });
          modalStore.closeModal();
        };
        break;
      case 'remove':
        onSubmit = () => {
          treeStore.removeItem();
          modalStore.closeModal();
        };
        break;
      default:
        return null;
    }
    
    return onSubmit;
  };
  
  render() {
    const selectedItemName = treeStore.selected ? last(treeStore.selected.split('/')) : '';
    const onSubmit = this.getOnSubmitHandler();
    
    return modalStore.display ? (
      <ModalDialog
        type={modalStore.type}
        selectedItemName={selectedItemName}
        onClose={modalStore.closeModal}
        onSubmit={onSubmit}
      />
    ) : null;
  }
}

export default observer(ModalDialogContainer);
