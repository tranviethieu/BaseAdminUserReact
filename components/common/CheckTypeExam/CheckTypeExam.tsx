import React from 'react';

import styles from './CheckTypeExam.module.scss';
import {TypeCheckTypeExam} from './interfaces';
import {listExam} from '~/constants/mock/data';
import clsx from 'clsx';

function CheckTypeExam({type}: TypeCheckTypeExam) {
	const checkType = listExam.find((obj) => obj.value == type);

	return (
		<div
			className={clsx(styles.container, {
				[styles.KTV]: checkType?.value == 1,
				[styles.KTT]: checkType?.value == 2,
				[styles.KTN]: checkType?.value == 3,
			})}
		>
			<div
				className={clsx(styles.dot, {
					[styles.KTV]: checkType?.value == 1,
					[styles.KTT]: checkType?.value == 2,
					[styles.KTN]: checkType?.value == 3,
				})}
			></div>
			<p
				className={clsx(styles.title, {
					[styles.KTV]: checkType?.value == 1,
					[styles.KTT]: checkType?.value == 2,
					[styles.KTN]: checkType?.value == 3,
				})}
			>
				{checkType?.title}
			</p>
		</div>
	);
}

export default CheckTypeExam;
