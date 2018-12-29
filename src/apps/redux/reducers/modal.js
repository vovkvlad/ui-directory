import { handleActions } from 'redux-actions';

import { OPEN_MODAL_DIALOG, CLOSE_MODAL_DIALOG } from '../constants'

const initialState = {
  display: false,
  type: null,
};

export default handleActions({
  [OPEN_MODAL_DIALOG]: (state, action) => {
    const { payload: { type } } = action;
    
    if (!type) {
      throw new Error('Modal should have type parameter, otherwise we do not know what to render');
    }
    
    return {
      display: true,
      type,
    }
  },
  [CLOSE_MODAL_DIALOG]: (state, action) => {
    return {
      display: false,
      type: null,
    }
  }
}, initialState);