import { handleActions } from 'redux-actions';

import { DIR } from '../testDirectoryStructure';

import {
  SELECT_ITEM,
  ADD_NEW_FILE,
  REMOVE_ITEM,
  RENAME_ITEM,
  ADD_NEW_DIRECTORY,
} from '../constants';
import { renameItem } from 'utils/renameItem';
import { addItemToTree } from 'utils/addNewItemToTree';
import { removeItemFromTree } from 'utils/removeItem';

const initialState = {
  fileTree: DIR,
  selected: null,
};

const reducerMap = {
  [SELECT_ITEM]: (state, action) => {
    const { payload } = action;
    return {
      ...state,
      selected: payload,
    };
  },
  
  [ADD_NEW_FILE]: (state, action) => {
    const { payload: { value } } = action;
    const { fileTree, selected } = state;
    
    const newTree = addItemToTree(fileTree, selected, value);
    
    return {
      fileTree: newTree,
      selected: null,
    }
  },
  
  [REMOVE_ITEM]: (state, action) => {
    const { fileTree, selected } = state;
  
    const newTree = removeItemFromTree(fileTree, selected);
    
    return {
      fileTree: newTree,
      selected: null,
    }
  },
  
  [RENAME_ITEM]: (state, action) => {
    const { payload: { value } } = action;
    const { fileTree, selected } = state;
    
    const newTree = renameItem(fileTree, selected, value);
    
    return {
      fileTree: newTree,
      selected: null,
    }
  },
  
  [ADD_NEW_DIRECTORY]: (state, action) => {
    const { payload: { value } } = action;
    const { fileTree, selected } = state;
    
    const newTree = addItemToTree(fileTree, selected, value, true);
    
    return {
      fileTree: newTree,
      selected: null,
    };
  },
};

export default handleActions(reducerMap, initialState);