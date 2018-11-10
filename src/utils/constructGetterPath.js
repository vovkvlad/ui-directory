import { compact } from "lodash";

export const constructGetterPath = (path, fileTree) => {
  const subDirectories = compact(path.split('/'));
  let currentItem = fileTree;
  let getterPath = '';
  
  subDirectories.forEach((subDirectory, index, array) => {
    const subDirectoryResultIndex = currentItem.findIndex(item => item.name === subDirectory);
    
    if (subDirectoryResultIndex === -1) {
      throw new Error(`There is no such directory or file as ${subDirectory}`);
    } else {
      getterPath += `[${subDirectoryResultIndex}]`;
      if (index !== array.length - 1) {
        currentItem = currentItem[ subDirectoryResultIndex ].children;
        getterPath += '.children';
      }
    }
    
  });
  
  return getterPath;
};