import React from 'react';

import styles from './RecordingFiles.module.scss';
import {ShieldTick} from 'iconsax-react';
import {TypeData} from '../../interfaces';

function RecordingFiles({data}: TypeData) {
	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<div className={styles.left}>
					<div className={styles.icon}>
						<ShieldTick size={22} color='#FF535A' variant='Bold' />
					</div>
					<h4 className={styles.title}>File ghi âm</h4>
				</div>
			</div>
			<div className={styles.main}>
				<audio src={data?.recordingFile?.file} controls />
			</div>
		</div>
	);
}

export default RecordingFiles;
