import { set, cloneDeep } from 'lodash';

import { constructGetterPath } from './constructGetterPath';

export const renameItem = (fileTree, selectedItemPath, newName) => {
  const getterPath = constructGetterPath(selectedItemPath, fileTree);
  const namePropPath = `${getterPath}.name`;
  
  return set(cloneDeep(fileTree), namePropPath, newName);
};