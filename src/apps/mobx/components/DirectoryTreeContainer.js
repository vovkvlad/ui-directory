import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash'
import { observer } from 'mobx-react';

import DirectoryContainer from 'components/DirectoryContainer';

class DirectoryTreeContainer extends Component {
  static propTypes = {
    root: PropTypes.string.isRequired,
    onFolderDoubleClick: PropTypes.func.isRequired,
  };
  
  onItemSelect = (key, rightClick) => {};
  
  render() {
    return <div>Tree</div>
  }
}

export default observer(DirectoryTreeContainer);
