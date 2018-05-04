import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class File extends Component {
  
  state = {
    isLoading: true
  };
  
  static propTypes = {
    extension: PropTypes.string,
    name: PropTypes.string,
  };
  
  static defaultProps = {
    extension: '',
    name: 'File',
  };
  
  render() {
    const { name, extension } = this.props;
    return (
      <div>
        <span>{`${name}.${extension}`}</span>
      </div>
    );
  }
}