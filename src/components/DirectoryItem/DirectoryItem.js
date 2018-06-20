import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class DirectoryItem extends Component {
  static propTypes = {
    childFiles: PropTypes.array,
    name: PropTypes.string,
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
  
  render() {
    const { isOpen } = this.state;
    
    return (
      <div onClick={this.toggleOpen}>
        {isOpen ? <span className='fas fa-caret-down'/> : <span className='fas fa-caret-right'/>}
        <span className='far fa-folder'/>
        {isOpen ? <span>Not ready yet</span> : null}
      </div>
    );
  }
}