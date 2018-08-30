import React from 'react';

import styles from './ItemPreview.scss';

export default props => <span className={styles.itemMeta}>{JSON.stringify(props.meta, null, 2)}</span>