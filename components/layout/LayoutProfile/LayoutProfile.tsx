import React from 'react';
import {TypeLayoutProfile} from './interfaces';
import styles from './LayoutProfile.module.scss';
import SideBarProfile from './SideBarProfile';

function LayoutProfile({title, children}: TypeLayoutProfile) {
	return (
		<div className={styles.container}>
			<SideBarProfile />
			<div className={styles.main}>
				<h4 className={styles.title}>{title}</h4>
				<div className={styles.wrapper}>{children}</div>
			</div>
		</div>
	);
}

export default LayoutProfile;
