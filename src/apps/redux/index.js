import React from 'react';
import { Provider } from 'react-redux';

import createStore from './createStore';
import AppDecorator from './AppDecorator';

const store = createStore();

const reduxApp = () => {
  return (
    <Provider store={store} >
      <AppDecorator />
    </Provider>
  );
};

export default reduxApp;