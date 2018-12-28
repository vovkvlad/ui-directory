import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DirectoryTreeContainer from './DirectoryTreeContainer';
/*
import ItemPreviewContainer from './ItemPreviewContainer';
import ContextMenuContainer from './ContextMenuContainer';
import ModalDialogContainer from './ModalDialogContainer';
*/
import BreadCrumbs from 'components/Breadcrumbs';

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
        {/*<ItemPreviewContainer />
        <ContextMenuContainer />
        <ModalDialogContainer />*/}
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppController);