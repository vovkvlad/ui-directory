import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router';

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
        <div>AAA</div>
      </Fragment>
    );
  }
}

export default withRouter(AppController);