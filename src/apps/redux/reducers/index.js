import { combineReducers } from 'redux';

import tree from './tree';
import modal from './modal';
import contextMenu from './contextMenu';

export default combineReducers({
  tree,
  modal,
  contextMenu,
})