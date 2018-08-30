import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import getFileIcon from './getFileIcon';

export default class FileIcon extends PureComponent {
  static propTypes = {
    extension: PropTypes.string,
    additionalClass: PropTypes.string,
  };
  
  
  render() {
    const { extension, additionalClass='' } = this.props;
    
    return <span className={cx('far', getFileIcon(extension), additionalClass)} />;
  }
}