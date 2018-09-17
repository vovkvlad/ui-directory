import React from 'react';

import styles from './ItemPreview.scss';

export default props => (
  <div className={styles.itemMeta}>
    <h3>Details:</h3>
    <pre>{JSON.stringify(props.meta, null, 2)}</pre>
  </div>
);