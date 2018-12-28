import { handleActions } from 'redux-actions';

import { DIR } from '../testDirectoryStructure';

import { SELECT_ITEM } from '../constants';

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
  }
};

/*export default (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    default:
      return state;
  }
};*/

export default handleActions(reducerMap, initialState);