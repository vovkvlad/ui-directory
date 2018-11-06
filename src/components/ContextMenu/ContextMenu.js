import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import style from './ContextMenu.scss';

export default class ContextMenu extends Component {
  static propTypes = {
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    items: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      fn: PropTypes.func,
    })),
  };
  
  renderMenu() {
    const { position: { x, y }} = this.props;
    const positionStyle = {
      left: x,
      top: y,
    };
    return (
      <ul className={style.container} style={positionStyle}>
        <li className={style.listItem}>Item 1 asdsdadadasddsad</li>
        <li className={style.listItem}>Item 3</li>
        <li className={style.listItem}>Item 1 asdsdadadasddsad</li>
        <li className={style.listItem}>Item 1 asdsdadadasddsad</li>
        <li className={style.listItem}>Item 1 asdsdadadasddsad</li>
        <li className={style.listItem}>Item 1 asdsdadadasddsad</li>
      </ul>
    );
  }
  
  render() {
    let mainContainer = document.getElementById('app');
    
    return ReactDOM.createPortal(this.renderMenu(), mainContainer);
  }
}
