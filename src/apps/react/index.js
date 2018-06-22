import React from 'react';

import { DIR } from './testDirectoryStructure';
import DirectoryContainer from 'components/DirectoryContainer';

const reactApp = () => {
  return <DirectoryContainer content={DIR}/>;
};

export default reactApp;