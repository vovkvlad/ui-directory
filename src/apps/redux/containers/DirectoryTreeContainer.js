import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { getFileTree, getSelectedItem } from 'apps/redux/selectors/tree';
import { getItemByPath } from 'utils/getItemByPath';
import { selectItem } from 'apps/redux/actions/tree';
import { openContextMenu, closeContextMenu } from 'apps/redux/actions/contextMenu';
import DirectoryContainer from 'components/DirectoryContainer';

class DirectoryTreeContainer extends Component {
  static propTypes = {
    root: PropTypes.string.isRequired,
    onFolderDoubleClick: PropTypes.func.isRequired,
  };
  
  onItemSelect = (key, rightClick) => {
    const { selectedItem, selectItem, closeContextMenu } = this.props;
    
    if (rightClick) {
      // no need to set state if nothing changed
      if (selectedItem !== key) {
        selectItem(key);
      }
    } else {
      const newSelectedItem = selectedItem === key ? null : key;
      selectItem(newSelectedItem);
      closeContextMenu();
    }
  };
  
  render() {
    const {
      selectedItem,
      content,
      root,
      onFolderDoubleClick,
      openContextMenu
    } = this.props;
    
    return (
      <DirectoryContainer
        content={get(content, 'children') || content}
        selectedItem={selectedItem}
        root={root}
        onItemSelect={this.onItemSelect}
        onFolderDoubleClick={onFolderDoubleClick}
        onItemRightButtonClick={openContextMenu}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { root } = ownProps;
  
  const fileTree = getFileTree(state);
  const selectedItem = getSelectedItem(state);
  const content = getItemByPath(fileTree, root);
  
  return {
    selectedItem,
    content,
  };
};

const mapDispatchToProps = {
  selectItem,
  openContextMenu,
  closeContextMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryTreeContainer);