import React from 'react';
import { Route, Link } from 'react-router-dom';
import { difference } from 'lodash';

import AppController from './AppController';

const getDirectoryPath = ({ basePath, actualPath }) => {
  const basePathArray = basePath.split('/');
  const actualPathArray = actualPath.split('/');
  
  return difference(actualPathArray, basePathArray).join('/');
};

const reactApp = (routerProps) => {
  const { location: { pathname }, match: { url } } = routerProps;
  const appRoot = getDirectoryPath({ basePath: url, actualPath: pathname });
  console.log(appRoot);
  
  return <Route render={props => {
    return (
      <div>
        <AppController/>
        <Link to={`${props.match.url}/folder1`}>AAAAAA</Link>
      </div>
    );
  }}/>;
};

export default reactApp;