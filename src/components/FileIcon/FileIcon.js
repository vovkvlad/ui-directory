import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import getFileIcon from './getFileIcon';

export default class FileIcon extends PureComponent {
  static propTypes = {
    extension: PropTypes.string,
  };
  
  
  render() {
    const { extension } = this.props;
    
    return <span className={`far ${getFileIcon(extension)}`} />;
  }
}