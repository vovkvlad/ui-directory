import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DirectoryComponent extends Component {
  static propTypes = {
    childFiles: PropTypes.array,
    name: PropTypes.string.required,
  };
  
  static defaultProps = {
    childFiles: [],
  };
  
  state = {
    isOpen: false,
  };
  
  toggleOpen() {
    const { isOpen } = this.state;
    
    this.setState({
      isOpen: !isOpen,
    });
  }
  
  renderDirectoryContents() {
    const { name, childFiles } = this.props;
    const { isOpen } = this.state;
    
    if (isOpen) {
      return <span>Not ready yet</span>
    } else {
      return <span>{name}</span>
    }
  }
  
  render() {
    return (
      <div onClick={this.toggleOpen}>
        <span className='far fa-folder' />
        {this.renderDirectoryContents()}
      </div>
    );
  }
}