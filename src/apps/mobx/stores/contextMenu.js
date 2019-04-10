import { observable, action } from 'mobx';

class ContextMenuStore {
  @observable display = false;
  @observable position = {
    x: 0,
    y: 0
  };
  
  @action.bound
  openContextMenu({ position }) {
    this.display = true;
    this.position = position;
  }
  
  @action.bound
  closeContextMenu() {
    this.display = false;
  }
}

export default new ContextMenuStore();