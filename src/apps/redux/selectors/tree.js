import { get } from 'lodash';

export const getTree = (state) => get(state, 'tree');
export const getFileTree = (state) => get(getTree(state), 'fileTree');
export const getSelectedItem = (state) => get(getTree(state), 'selected');