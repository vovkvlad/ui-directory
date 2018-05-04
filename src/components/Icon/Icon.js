import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import getFileIcon from './getFileIcon';

export default class Icon extends PureComponent {
  static propTypes = {
    extension: PropTypes.string.required,
  };
  
  
  render() {
    const { extension } = this.props;
    
    return <span className={`far ${getFileIcon(extension)}`} />;
  }
}