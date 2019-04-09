import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { difference } from 'lodash';
import { observer } from 'mobx-react';

import AppController from './AppController';

export default class AppDecorator extends Component {
  getDirectoryPath = ({ basePath, actualPath }) => {
    const basePathArray = basePath.split('/');
    const actualPathArray = actualPath.split('/');
    
    return '/'.concat(difference(actualPathArray, basePathArray).join('/'));
  };
  
  render() {
    return (
      <Route render={routerProps => {
        const { location: { pathname }, match: { url } } = routerProps;
        const appRoot = this.getDirectoryPath({ basePath: url, actualPath: pathname });
        
        return <AppController root={appRoot}/>;
      }}/>
    );
  }
}
