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
      key: PropTypes.string,
      label: PropTypes.string,
      fn: PropTypes.func,
    })),
    selectedItem: PropTypes.string,
  };
  
  renderMenu() {
    const { position: { x, y }, items, selectedItem } = this.props;
    const positionStyle = {
      left: x,
      top: y,
    };
    console.log('==========================');
    console.log(selectedItem);
    console.log('==========================');
    return (
      <ul className={style.container} style={positionStyle}>
        {/*<li className={style.listItem}>Item 1 asdsdadadasddsad</li>
        <li className={style.listItem}>Item 3</li>
        <li className={style.listItem}>Item 1 asdsdadadasddsad</li>
        <li className={style.listItem}>Item 1 asdsdadadasddsad</li>
        <li className={style.listItem}>Item 1 asdsdadadasddsad</li>
        <li className={style.listItem}>Item 1 asdsdadadasddsad</li>*/}
        {
          items.map(({ key, label, fn }) => {
            return (
              <li
                key={key}
                onClick={fn}
                className={style.listItem}
              >
                {label}
              </li>
            );
          })
        }
      </ul>
    );
  }
  
  render() {
    let app = document.getElementById('app');
    
    return ReactDOM.createPortal(this.renderMenu(), app);
  }
}
