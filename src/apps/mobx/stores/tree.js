import { observable, action } from 'mobx';
import { filter, get, set } from 'lodash';

import { DIR } from '../testDirectoryStructure';
import { constructGetterPath } from 'utils/constructGetterPath';

class TreeStore {
  @observable tree = DIR;
  @observable selected = null;
  
  @action
  selectItem(slected) {
    this.selected = selected;
  }
  
  @action
  addNewFile(newItemName) {
    let pathToAddTo;
  
    if (get(this.tree, `${constructGetterPath(this.selected, this.tree)}.children`)) { // in case folder selected - add inside it
      pathToAddTo = this.selected;
    } else {
      const subDirs = this.selected.split('/');
      subDirs.pop();
      pathToAddTo = subDirs.join('/');
    }
  
    const getterPath = constructGetterPath(pathToAddTo, this.tree);
  
    const childrenArray = getterPath ? get(this.tree, `${getterPath}.children`) : this.tree;
    const [ name, extension ] = newItemName.split('.');
    let newItem = { name, extension };
  
    childrenArray.push(newItem);
    
    this.selected = null;
    // return getterPath ? set(cloneDeep(fileTree), `${getterPath}.children`, newChildren) : newChildren;
  }
  
  @action
  removeItem(){
    const subDirs = this.selected.split('/');
    const nameToRemove = subDirs.pop();
    const pathToRemoveFrom = subDirs.join('/');
  
    const getterPath = constructGetterPath(pathToRemoveFrom, this.tree);
  
    let childrenArray = getterPath ? get(this.tree, `${getterPath}.children`) : this.tree;
  
    childrenArray = filter(childrenArray, item => item.name !== nameToRemove);
    
    this.selected = null;
  
    // return getterPath ? set(cloneDeep(fileTree), `${getterPath}.children`, newChildrenArray) : newChildrenArray;
  }
  
  @action
  renameItem(newName){
    const getterPath = constructGetterPath(this.selected, this.tree);
    const namePropPath = `${getterPath}.name`;
  
    set(this.tree, namePropPath, newName);
  
    this.selected = null;
  
  }
  
  @action
  addDirectory(newItemName){
    let pathToAddTo;
  
    if (get(this.tree, `${constructGetterPath(this.selected, this.tree)}.children`)) { // in case folder selected - add inside it
      pathToAddTo = this.selected;
    } else {
      const subDirs = this.selected.split('/');
      subDirs.pop();
      pathToAddTo = subDirs.join('/');
    }
  
    const getterPath = constructGetterPath(pathToAddTo, this.tree);
  
    const childrenArray = getterPath ? get(this.tree, `${getterPath}.children`) : this.tree;
    let newItem = { name: newItemName, children: [] };
  
    childrenArray.push(newItem);
  
    this.selected = null;
  
    // return getterPath ? set(cloneDeep(fileTree), `${getterPath}.children`, newChildren) : newChildren;
  }
}

export default new TreeStore();