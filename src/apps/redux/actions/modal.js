import { createAction } from 'redux-actions';

import { OPEN_MODAL_DIALOG, CLOSE_MODAL_DIALOG } from '../constants'

export const openModal = createAction(OPEN_MODAL_DIALOG);
export const closeModal = createAction(CLOSE_MODAL_DIALOG);