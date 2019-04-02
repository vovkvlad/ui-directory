import { observable, action } from 'mobx';

import { DIR } from '../testDirectoryStructure';
import { renameItem } from 'utils/renameItem';
import { addItemToTree } from 'utils/addNewItemToTree';
import { removeItemFromTree } from 'utils/removeItem';

class TreeStore {
  @observable tree = DIR;
  @observable selected = null;
}