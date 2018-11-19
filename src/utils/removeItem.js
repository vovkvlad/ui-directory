import { cloneDeep, get, set, filter } from 'lodash';

import { constructGetterPath } from './constructGetterPath';

export const removeItemFromTree = (fileTree, selectedItem) => {
  const subDirs = selectedItem.split('/');
  const nameToRemove = subDirs.pop();
  const pathToRemoveFrom = subDirs.join('/');
  
  const getterPath = constructGetterPath(pathToRemoveFrom, fileTree);
  
  const childrenArray = getterPath ? get(fileTree, `${getterPath}.children`) : fileTree;
  
  const newChildrenArray = filter(childrenArray, item => item.name !== nameToRemove);
  
  return getterPath ? set(cloneDeep(fileTree), `${getterPath}.children`, newChildrenArray) : newChildrenArray;
};