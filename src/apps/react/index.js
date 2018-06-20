import React from 'react';

import { DIR } from './testDirectoryStructure';
import DirectoryContainer from 'components/DirectoryContainer';
const reactApp = () => {
  return (
    <div>
      <DirectoryContainer content={DIR}/>
    </div>
  );
};

export default reactApp;