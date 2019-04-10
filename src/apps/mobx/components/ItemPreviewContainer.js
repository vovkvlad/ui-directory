import React, { Component } from 'react';
import { observer } from 'mobx-react';

import ItemPreview from 'components/ItemPreview';
import { getItemByPath } from 'utils/getItemByPath';
import { treeStore } from 'apps/mobx/stores'


class ItemPreviewContainer extends Component {
  render() {
    const selected = treeStore.selected && getItemByPath(treeStore.tree, treeStore.selected);
    
    return selected ? <ItemPreview selectedItem={selected}/> : null;
  }
}

export default observer(ItemPreviewContainer);