import React from 'react';
import cx from 'classnames';

import FileIcon from 'components/FileIcon';
import styles from './ItemPreview.scss';

export default props => {
  const { name, extension } = props;
  const isDirectory = !extension;
  
  return (
    <div className={styles.itemHeader}>
      {isDirectory ? <span className={cx(styles.headerIcon,'far fa-folder')} /> : <FileIcon extension={extension} additionalClass={styles.headerIcon} />}
      <span className={styles.headerName}>{name}</span>
    </div>
  );
};