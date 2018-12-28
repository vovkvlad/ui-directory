import { createAction } from 'redux-actions';

import { OPEN_CONTEXT_MENU, CLOSE_CONTEXT_MENU } from '../constants';

export const openContextMenu = createAction(OPEN_CONTEXT_MENU);
export const closeContextMenu = createAction(CLOSE_CONTEXT_MENU);