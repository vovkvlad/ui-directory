import { compact } from "lodash";

export const getItemByPath = (fileTree, path) => {
  const subDirectories = compact(path.split('/'));
  let currentItem = fileTree;
  
  subDirectories.forEach((subDirectory, index, array) => {
    const subDirectoryResult = currentItem.find(item => item.name === subDirectory);
    
    if (!subDirectoryResult) {
      throw new Error(`There is no such directory or file as ${subDirectory}`);
    } else {
      // if this is the last one - we need to return it as is as it might be a file - otherwise
      // it is definitely subfolder and we need to go deeper
      if (index === array.length - 1) {
        currentItem = subDirectoryResult;
      } else {
        currentItem = subDirectoryResult.children;
      }
    }
    
  });
  
  return currentItem;
};