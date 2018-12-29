import React, { Component } from 'react';
import { connect } from 'react-redux';

import ItemPreview from 'components/ItemPreview';
import { getItemByPath } from 'utils/getItemByPath';
import { getSelectedItem, getFileTree } from 'apps/redux/selectors/tree';

class ItemPreviewContainer extends Component {
  render() {
    const { selected } = this.props;
    
    return selected ? <ItemPreview selectedItem={selected}/> : null;
  }
}

const mapStateToProps = (state, ownProps) => {
  const selectedItem = getSelectedItem(state);
  const fileTree = getFileTree(state);
  const selected = selectedItem && getItemByPath(fileTree, selectedItem);
  
  return {
    selected
  }
};

export default connect(mapStateToProps, null)(ItemPreviewContainer);