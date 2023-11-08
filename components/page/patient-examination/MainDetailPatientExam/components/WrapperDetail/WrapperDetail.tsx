import React from 'react';

import {TypeWrapperDetail} from './interfaces';
import styles from './WrapperDetail.module.scss';

function WrapperDetail({icon, title, children}: TypeWrapperDetail) {
	return (
		<div className={styles.container}>
			<div className={styles.top}>
				{icon && <div className={styles.icon}>{icon}</div>}
				<h4 className={styles.title}>{title}</h4>
			</div>
			<div className={styles.main}>{children}</div>
		</div>
	);
}

export default WrapperDetail;
