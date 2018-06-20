import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FileIcon from 'components/FileIcon';

export default class File extends Component {
  
  state = {
    isLoading: true
  };
  
  static propTypes = {
    extension: PropTypes.string,
    name: PropTypes.string,
    meta: PropTypes.object,
  };
  
  render() {
    const { name, extension } = this.props;
    return (
      <div>
        <FileIcon extension={extension} />
        <span>{`${name}.${extension}`}</span>
      </div>
    );
  }
}