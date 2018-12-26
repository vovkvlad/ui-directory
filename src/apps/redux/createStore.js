import { createStore } from 'redux';
import { enableBatching } from 'redux-batched-actions';

import rootReducer from './reducers'

export default () => {
  return createStore(
    enableBatching(rootReducer),
    {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
};