import React, {useEffect, useState} from 'react';
import InformationExamCart from './components/InformationExamCart';
import InfoDetailExamCart from './components/InfoDetailExamCart';
import Breadcrumb from './components/Breadcrumb';

import styles from './MainDetailPatientExam.module.scss';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {httpRequest} from '~/services';
import medicalRecord from '~/services/medicalRecord';
import LoadingData from '~/components/common/LoadingData';

function MainDetailPatientExam() {
	const router = useRouter();

	const {_id} = router.query;
	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);

	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<any>();

	// Call api
	useEffect(() => {
		if (accountId && _id && token) {
			httpRequest({
				setLoading: setLoading,
				http: medicalRecord.getDetailMedicalRecord({
					token: token!,
					AccountUuid: accountId as string,
					uuid: _id as string,
				}),
			}).then((data) => {
				if (data) {
					setData(data);
				}
			});
		}
	}, [_id, accountId, router, token]);

	return (
		<LoadingData isLoading={loading}>
			<div className={styles.container}>
				<Breadcrumb
					isCanFinish={data?.mrBoolean?.isCanFinish}
					isCanCancel={data?.mrBoolean?.isCanCancel}
					state={data?.medicalRecordInfo?.state?.id}
					ticketUuid={data?.medicalRecordInfo?.uuid}
					codeTicket={data?.medicalRecordInfo?.code}
					namePatient={data?.patientInfo?.fullName}
				/>
				<div className={styles.main}>
					<InformationExamCart data={data} />
					<InfoDetailExamCart data={data} />
				</div>
			</div>
		</LoadingData>
	);
}

export default MainDetailPatientExam;
