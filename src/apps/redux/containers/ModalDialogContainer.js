import React, { Component } from 'react';
import { connect } from 'react-redux';
import { last } from 'lodash';

import { getSelectedItem } from 'apps/redux/selectors/tree';
import { getModal } from 'apps/redux/selectors/modal';
import { closeModal } from 'apps/redux/actions/modal';
import { addNewFile, addNewDirectory, renameItem, removeItem } from 'apps/redux/actions/tree';
import ModalDialog from 'components/ModalDialog';

class ModalDialogContainer extends Component {
  
  getOnSubmitHandler = () => {
    const {
      type,
      addNewFile,
      addNewDirectory,
      renameItem,
      removeItem,
      closeModal,
    } = this.props;
  
    let onSubmit;
  
    switch (type) {
      case 'rename':
        onSubmit = (value) => {
          renameItem({ value });
          closeModal();
        };
        break;
      case 'add':
        onSubmit = (value) => {
          addNewFile({ value });
          closeModal();
        };
        break;
      case 'add-folder':
        onSubmit = (value) => {
          addNewDirectory({ value });
          closeModal();
        };
        break;
      case 'remove':
        onSubmit = () => {
          removeItem();
          closeModal();
        };
        break;
      default:
        return null;
    }
    
    return onSubmit;
  };
  
  render() {
    const { selectedItem, type, display, closeModal } = this.props;
  
    const selectedItemName = selectedItem ? last(selectedItem.split('/')) : '';
    const onSubmit = this.getOnSubmitHandler();
    
    return display ? (
      <ModalDialog
        type={type}
        selectedItemName={selectedItemName}
        onClose={closeModal}
        onSubmit={onSubmit}
      />
    ) : null;
  }
}

const mapStateToProps = (state, ownProps) => {
  const selectedItem = getSelectedItem(state);
  const { display, type } = getModal(state);
  
  return {
    selectedItem,
    display,
    type,
  };
};

const mapDispatchToProps = {
  closeModal,
  addNewFile,
  addNewDirectory,
  renameItem,
  removeItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDialogContainer);