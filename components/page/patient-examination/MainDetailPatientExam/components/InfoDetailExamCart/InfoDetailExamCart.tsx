import React, {Fragment} from 'react';

import styles from './InfoDetailExamCart.module.scss';
import BasicStats from './components/BasicStats';
import ResultExam from './components/ResultExam';
import Prescriptions from './components/Prescriptions';
import RecordingFiles from './components/RecordingFiles';
import {TypeData} from './interfaces';
import {TYPE_EXAM} from '~/constants/mock/enum';
import SpecifyVotes from './components/SpecifyVotes';

function InfoDetailExamCart({data}: TypeData) {
	return (
		<Fragment>
			<div className={styles.wrapper}>
				{(data?.medicalRecordInfo?.addressType?.id ==
					TYPE_EXAM.CO_SO_Y_TE ||
					data?.medicalRecordInfo?.addressType?.id ==
						TYPE_EXAM.TAI_NHA) && <SpecifyVotes data={data} />}

				{data?.medicalRecordInfo?.addressType?.id ==
					TYPE_EXAM.TAI_NHA && <BasicStats data={data} />}
				{/* {data?.medicalRecordInfo?.addressType?.id ==
					TYPE_EXAM.TRUC_TUYEN && <RecordingFiles data={data} />} */}

				<div className={styles.bottom}>
					<ResultExam data={data} />
					<Prescriptions data={data} />
				</div>
			</div>
		</Fragment>
	);
}

export default InfoDetailExamCart;
