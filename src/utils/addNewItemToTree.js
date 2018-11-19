import { cloneDeep, get, set } from 'lodash';

import { constructGetterPath } from './constructGetterPath';

export const addItemToTree = (fileTree, selectedItem, newItemName, isFolder) => {
  let pathToAddTo;
  
  if (get(fileTree, `${constructGetterPath(selectedItem, fileTree)}.children`)) { // in case folder selected - add inside it
    pathToAddTo = selectedItem;
  } else {
    const subDirs = selectedItem.split('/');
    subDirs.pop();
    pathToAddTo = subDirs.join('/');
  }
  
  const getterPath = constructGetterPath(pathToAddTo, fileTree);
  
  const childrenArray = getterPath ? get(fileTree, `${getterPath}.children`) : fileTree;
  let newItem;
  if (isFolder) {
    newItem = { name: newItemName, children: [] };
  } else {
    const [ name, extension ] = newItemName.split('.');
    newItem = { name, extension };
  }
  
  const newChildren = [
    ...childrenArray,
    newItem
  ];
  
  
  return getterPath ? set(cloneDeep(fileTree), `${getterPath}.children`, newChildren) : newChildren;
};