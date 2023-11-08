import React, {useEffect, useMemo, useState} from 'react';
import styles from './MainPatientExamination.module.scss';
import {Stickynote, Trash} from 'iconsax-react';
import TabNavLinkIcon from '~/components/controls/TabNavLinkIcon';
import ButtonExport from '~/components/controls/ButtonExport';
import BoxFilter from '~/components/controls/BoxFilter';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import {updateSort} from '~/redux/reducer/sort';
import TablePatientExamination from '../TablePatientExamination';
import TablePatientExamHappening from '../TablePatientExamHappening/TablePatientExamHappening';
import TablePatientExamEnd from '../TablePatientExamEnd/TablePatientExamEnd';
import {
	statusMedicalRecordEnd,
	statusMedicalRecordPenning,
	statusMedicalRecordWait,
} from '~/constants/mock/data';
import {RootState} from '~/redux/store';
import {checkNullQuery} from '~/common/func/checkNullQuery';
import convertDate from '~/common/func/convertDate';
import {STATUS_EXAM} from '~/constants/mock/enum';

function MainPatientExamination() {
	const router = useRouter();
	const dispatch = useDispatch();

	const {_status} = router.query;

	const {accountId} = useSelector((state: RootState) => state.user);
	const {medicalExam, medicalTime} = useSelector(
		(state: RootState) => state.sort
	).sort;

	const listFilter: Array<any> = [
		{
			title: 'Chờ khám',

			icon: Stickynote,
			query: null,
			pathname: '/patient-examination',
		},
		{
			title: 'Đang diễn ra',
			icon: Stickynote,
			query: 'happenning',
			pathname: '/patient-examination',
		},
		{
			title: 'Kết thúc',
			icon: Stickynote,
			query: 'end',
			pathname: '/patient-examination',
		},
	];

	// Handle clear filter
	const handleClear = () => {
		dispatch(
			updateSort({
				name: 'medicalStatus',
				value: null,
			})
		);
		dispatch(
			updateSort({
				name: 'medicalExam',
				value: null,
			})
		);
		dispatch(
			updateSort({
				name: 'medicalTime',
				value: null,
			})
		);
		dispatch(
			updateSort({
				name: 'medicalKeyword',
				value: '',
			})
		);
	};

	useEffect(() => {
		dispatch(
			updateSort({
				name: 'medicalStatus',
				value: null,
			})
		);
	}, [_status, dispatch]);

	// useEffect(() => {
	// 	if (Object.keys(sort).length === 0) {
	// 		setCheckTrash(false);
	// 	} else {
	// 		setCheckTrash(true);
	// 	}
	// }, [sort]);

	const url = useMemo(() => {
		return `${
			process.env.NEXT_PUBLIC_API_URL_DEV
		}/MedicalRecords/export?AccountUuid=${accountId}${
			!_status
				? `&States=${STATUS_EXAM.CHO_KHAM}`
				: _status == 'happenning'
				? `&States=${STATUS_EXAM.DANG_KHAM}`
				: `&States=${STATUS_EXAM.DA_KHAM}&States=${STATUS_EXAM.DA_HUY}`
		}${checkNullQuery('AddressType', medicalExam?.id)}${checkNullQuery(
			'From',
			convertDate(medicalTime?.from).getDateSubmit()
		)}${checkNullQuery(
			'To',
			convertDate(medicalTime?.to).getDateSubmit()
		)}`;
	}, [
		accountId,
		medicalExam?.id,
		medicalTime?.from,
		medicalTime?.to,
		_status,
	]);

	const handleExport = () => {
		window.open(url, '_blank');
	};

	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<TabNavLinkIcon listType={listFilter} query='_status' />
				<ButtonExport handleExport={handleExport} />
			</div>
			<div className={styles.filter}>
				<div className={styles.clear} onClick={handleClear}>
					<Trash size={20} />
				</div>

				<BoxFilter
					isStatus={_status == 'end'}
					keyNameStatus='medicalStatus'
					keyNameExam='medicalExam'
					keyNameTime='medicalTime'
					keyNameKeyword='medicalKeyword'
					arrayStatus={
						!_status
							? statusMedicalRecordWait
							: _status == 'happenning'
							? statusMedicalRecordPenning
							: statusMedicalRecordEnd
					}
				/>
			</div>

			<div className={styles.main}>
				{!_status && <TablePatientExamination />}
				{_status == 'happenning' && <TablePatientExamHappening />}
				{_status == 'end' && <TablePatientExamEnd />}
			</div>
		</div>
	);
}

export default MainPatientExamination;
