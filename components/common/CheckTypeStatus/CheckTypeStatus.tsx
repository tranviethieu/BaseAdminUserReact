import React from 'react';

import styles from './CheckTypeStatus.module.scss';
import {TypeCheckTypeStatus} from './interfaces';
import {listStatus} from '~/constants/mock/data';
import clsx from 'clsx';
import {STATUS_EXAM} from '~/constants/mock/enum';

function CheckTypeStatus({type, sm, dot}: TypeCheckTypeStatus) {
	const checkType = listStatus.find((obj) => obj.value == type);

	return (
		<div
			className={clsx(styles.container, {
				[styles.chua_thanh_toan]:
					checkType?.value == STATUS_EXAM.CHUA_THANH_TOAN,
				[styles.cho_xac_nhan]:
					checkType?.value == STATUS_EXAM.CHO_XAC_NHAN,
				[styles.da_xac_nhan]:
					checkType?.value == STATUS_EXAM.DA_XAC_NHAN,
				[styles.da_duyet]: checkType?.value == STATUS_EXAM.DA_DUYET,
				[styles.cho_kham]: checkType?.value == STATUS_EXAM.CHO_KHAM,
				[styles.den_luot_kham]:
					checkType?.value == STATUS_EXAM.DEN_LUOT_KHAM,
				[styles.dang_kham]: checkType?.value == STATUS_EXAM.DANG_KHAM,
				[styles.da_kham]: checkType?.value == STATUS_EXAM.DA_KHAM,
				[styles.tu_choi]: checkType?.value == STATUS_EXAM.TU_CHOI,
				[styles.da_huy]: checkType?.value == STATUS_EXAM.DA_HUY,
				[styles.sm]: sm,
				[styles.dot]: dot,
			})}
		>
			<div
				className={clsx(styles.dot, {
					[styles.chua_thanh_toan]:
						checkType?.value == STATUS_EXAM.CHUA_THANH_TOAN && dot,
					[styles.cho_xac_nhan]:
						checkType?.value == STATUS_EXAM.CHO_XAC_NHAN && dot,
					[styles.da_xac_nhan]:
						checkType?.value == STATUS_EXAM.DA_XAC_NHAN && dot,
					[styles.da_duyet]:
						checkType?.value == STATUS_EXAM.DA_DUYET && dot,
					[styles.cho_kham]:
						checkType?.value == STATUS_EXAM.CHO_KHAM && dot,
					[styles.den_luot_kham]:
						checkType?.value == STATUS_EXAM.DEN_LUOT_KHAM && dot,
					[styles.dang_kham]:
						checkType?.value == STATUS_EXAM.DANG_KHAM && dot,
					[styles.da_kham]:
						checkType?.value == STATUS_EXAM.DA_KHAM && dot,
					[styles.tu_choi]:
						checkType?.value == STATUS_EXAM.TU_CHOI && dot,
					[styles.da_huy]:
						checkType?.value == STATUS_EXAM.DA_HUY && dot,
				})}
			></div>
			<p className={clsx(styles.title)}>{checkType?.title}</p>
		</div>
	);
}

export default CheckTypeStatus;
