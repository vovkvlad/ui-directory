import { get } from 'lodash';

export const getContextMenu = (state) => get(state, 'contextMenu');