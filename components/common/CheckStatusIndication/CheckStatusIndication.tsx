import React from 'react';

import styles from './CheckStatusIndication.module.scss';
import {TypeCheckStatusIndication} from './interfaces';
import {listStatusIndication} from '~/constants/mock/data';
import clsx from 'clsx';
import {STATUS_INDICATION} from '~/constants/mock/enum';

function CheckStatusIndication({type}: TypeCheckStatusIndication) {
	const checkType = listStatusIndication.find((obj) => obj.value == type);

	return (
		<div
			className={clsx(styles.container, {
				[styles.cho_xu_ly]:
					checkType?.value == STATUS_INDICATION.CHO_XU_LY,
				[styles.dang_xu_ly]:
					checkType?.value == STATUS_INDICATION.DANG_XU_LY,
				[styles.da_xu_ly]:
					checkType?.value == STATUS_INDICATION.DA_XU_LY,
			})}
		>
			<div className={clsx(styles.dot)}></div>
			<p className={clsx(styles.title)}>{checkType?.title}</p>
		</div>
	);
}

export default CheckStatusIndication;
