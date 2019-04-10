import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router';

import DirectoryTreeContainer from './components/DirectoryTreeContainer';
import ContextMenuContainer from './components/ContextMenuContainer';
import ItemPreviewContainer from './components/ItemPreviewContainer';
import ModalDialogContainer from './components/ModalDialogContainer';

import BreadCrumbs from 'components/Breadcrumbs/index';

class AppController extends Component {
  static propTypes = {
    root: PropTypes.string.isRequired,
  };
  
  onBreadcrumbClick = folderPath => {
    const { history: { push }, match: { url } } = this.props;
    
    push(`${url}${folderPath === '/' ? '' : folderPath}`);
  };
  
  onFolderDoubleClick = folderPath => {
    const { history: { push }, match: { url } } = this.props;
    
    push(`${url}${folderPath}`)
  };
  
  render() {
    const {
      root,
    } = this.props;
  
    return (
      <Fragment>
        <BreadCrumbs
          path={root}
          onBreadcrumbClick={this.onBreadcrumbClick}
        />
        <DirectoryTreeContainer
          root={root}
          onFolderDoubleClick={this.onFolderDoubleClick}
        />
        <ItemPreviewContainer />
        <ContextMenuContainer />
        <ModalDialogContainer />
      </Fragment>
    );
  }
}

export default withRouter(AppController);