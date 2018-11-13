import { cloneDeep, get, set } from 'lodash';

import { constructGetterPath } from './constructGetterPath';

export const addFileToTree = (fileTree, selectedItem, newItemPath) => {
  const subDirs = selectedItem.split('/');
  subDirs.pop();
  const pathToAddTo = subDirs.join('/');
  const getterPath = constructGetterPath(pathToAddTo, fileTree);
  
  const childrenArray = getterPath ? get(fileTree, `${getterPath}.children`) : fileTree;
  const [name, extension] = newItemPath.split('.');
  const newChildren = [
    ...childrenArray,
    { name, extension }
  ];
  
  return getterPath ? set(cloneDeep(fileTree), `${getterPath}.children`, newChildren) : newChildren;
};