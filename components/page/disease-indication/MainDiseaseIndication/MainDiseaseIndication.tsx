import React, {useMemo} from 'react';
import styles from './MainDiseaseIndication.module.scss';
import TabNavLinkIcon from '~/components/controls/TabNavLinkIcon';
import ButtonExport from '~/components/controls/ButtonExport';
import {useRouter} from 'next/router';
import {Note1, NoteRemove, Stickynote, Trash} from 'iconsax-react';
import FilterIndication from '../FilterIndication';
import {useDispatch, useSelector} from 'react-redux';
import {updateSort} from '~/redux/reducer/sort';
import TableIndicationWait from '../TableIndicationWait';
import TableIndicationPendding from '../TableIndicationPendding/TableIndicationPendding';
import TableIndicationEnd from '../TableIndicationEnd/TableIndicationEnd';
import {RootState} from '~/redux/store';
import {checkNullQuery} from '~/common/func/checkNullQuery';
import convertDate from '~/common/func/convertDate';

function MainDiseaseIndication() {
	const router = useRouter();
	const dispatch = useDispatch();
	const {accountId} = useSelector((state: RootState) => state.user);
	const {indication, typeIndication, timeIndication} = useSelector(
		(state: RootState) => state.sort
	).sort;

	const {_status} = router.query;

	const listFilter: Array<any> = [
		{
			title: 'Chờ xử lý',
			icon: Note1,
			query: null,
			pathname: '/patient-examination',
		},
		{
			title: 'Đang xử lý',
			icon: NoteRemove,
			query: 'happenning',
			pathname: '/patient-examination',
		},
		{
			title: 'Đã xử lý',
			icon: Stickynote,
			query: 'end',
			pathname: '/patient-examination',
		},
	];

	// Handle clear filter
	const handleClear = () => {
		dispatch(
			updateSort({
				name: 'indication',
				value: null,
			})
		);
		dispatch(
			updateSort({
				name: 'typeIndication',
				value: null,
			})
		);
		dispatch(
			updateSort({
				name: 'timeIndication',
				value: null,
			})
		);
		dispatch(
			updateSort({
				name: 'keywordIndication',
				value: '',
			})
		);
	};

	const url = useMemo(() => {
		return `${
			process.env.NEXT_PUBLIC_API_URL_DEV
		}/MedicalRecordDesignations/export?AccountUuid=${accountId}${checkNullQuery(
			'Type',
			typeIndication?.id
		)}${checkNullQuery('Designation', indication?.uuid)}${checkNullQuery(
			'TimeDesignation',
			convertDate(timeIndication).getDateSubmit()
		)}${checkNullQuery(
			'StateId',
			!_status ? 1 : _status == 'happenning' ? 2 : 3
		)}`;
	}, [
		accountId,
		typeIndication?.id,
		indication?.uuid,
		timeIndication,
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

				<FilterIndication
					keyNameIndication='indication'
					keyNameType='typeIndication'
					keyNameTime='timeIndication'
					keyNameKeyword='keywordIndication'
				/>
			</div>
			<div className={styles.main}>
				{!_status && <TableIndicationWait />}
				{_status == 'happenning' && <TableIndicationPendding />}
				{_status == 'end' && <TableIndicationEnd />}
			</div>
		</div>
	);
}

export default MainDiseaseIndication;
