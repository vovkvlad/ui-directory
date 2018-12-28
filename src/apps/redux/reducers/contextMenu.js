import { handleActions } from 'redux-actions';

import { CLOSE_CONTEXT_MENU, OPEN_CONTEXT_MENU } from '../constants';

const initialState = {
  display: false,
  position: { x: 0, y: 0 },
};

/*
export default (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    default:
      return state;
  }
};*/

export default handleActions({
  [OPEN_CONTEXT_MENU]: (state, action) => {
    const { payload } = action;
    return {
      display: true,
      position: payload.position,
    }
  },
  [CLOSE_CONTEXT_MENU]: (state, action) => {
    return {
      display: false,
    }
  },
}, initialState);
