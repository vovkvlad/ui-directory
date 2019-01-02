import { createAction } from 'redux-actions';

import {
  SELECT_ITEM,
  ADD_NEW_FILE,
  REMOVE_ITEM,
  RENAME_ITEM,
  ADD_NEW_DIRECTORY,
} from '../constants';

export const selectItem = createAction(SELECT_ITEM);
export const addNewFile = createAction(ADD_NEW_FILE);
export const removeItem = createAction(REMOVE_ITEM);
export const renameItem = createAction(RENAME_ITEM);
export const addNewDirectory = createAction(ADD_NEW_DIRECTORY);