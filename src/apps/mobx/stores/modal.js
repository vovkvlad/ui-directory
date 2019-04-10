import { observable, action } from 'mobx';

class ModalStore {
  @observable display = false;
  @observable type = null;
  
  @action.bound
  openModal({ type }) {
    this.display = true;
    this.type = type;
  }
  
  @action.bound
  closeModal() {
    this.display = false;
    this.type = null;
  }
}

export default new ModalStore();