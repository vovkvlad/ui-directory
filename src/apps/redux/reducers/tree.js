import { DIR } from '../testDirectoryStructure';

const initialState = {
  fileTree: DIR,
  selected: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  
  switch (type) {
    default:
      return state;
  }
};