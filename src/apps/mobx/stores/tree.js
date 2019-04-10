import { observable, action } from 'mobx';
import { filter, get, set } from 'lodash';

import { DIR } from '../testDirectoryStructure';
import { constructGetterPath } from 'utils/constructGetterPath';

class TreeStore {
  @observable tree = DIR;
  @observable selected = null;
  
  @action
  selectItem(selected) {
    this.selected = selected;
  }
  
  @action
  addNewFile({ value }) {
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
    const [ name, extension ] = value.split('.');
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
    
    this.tree = getterPath ? set(this.tree, `${getterPath}.children`, childrenArray) : childrenArray;
    
    this.selected = null;
  
    // return getterPath ? set(cloneDeep(fileTree), `${getterPath}.children`, newChildrenArray) : newChildrenArray;
  }
  
  @action
  renameItem({ value }){
    const getterPath = constructGetterPath(this.selected, this.tree);
    const namePropPath = `${getterPath}.name`;
  
    set(this.tree, namePropPath, value);
  
    this.selected = null;
  
  }
  
  @action
  addDirectory({ value }){
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
    let newItem = { name: value, children: [] };
  
    childrenArray.push(newItem);
  
    this.selected = null;
  
    // return getterPath ? set(cloneDeep(fileTree), `${getterPath}.children`, newChildren) : newChildren;
  }
}

export default new TreeStore();