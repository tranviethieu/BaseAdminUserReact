import React, {useEffect, useMemo} from 'react';
import styles from './MainAppointmentSchedule.module.scss';
import {CalendarCircle, CalendarEdit, CalendarTick, Trash} from 'iconsax-react';
import TabNavLinkIcon from '~/components/controls/TabNavLinkIcon';
import ButtonExport from '~/components/controls/ButtonExport';
import BoxFilter from '~/components/controls/BoxFilter';
import TableAppointmentSchedule from '../TableAppointmentSchedule';
import {useRouter} from 'next/router';
import TableAppointmentPennding from '../TableAppointmentPennding';
import TableAppointmentEnd from '../TableAppointmentEnd';
import {updateSort} from '~/redux/reducer/sort';
import {useDispatch, useSelector} from 'react-redux';
import {
	listStatusEnd,
	listStatusPenning,
	listStatusWait,
} from '~/constants/mock/data';
import {RootState} from '~/redux/store';
import {checkNullQuery} from '~/common/func/checkNullQuery';
import convertDate from '~/common/func/convertDate';

function MainAppointmentSchedule() {
	const router = useRouter();
	const dispatch = useDispatch();
	const {accountId} = useSelector((state: RootState) => state.user);
	const {appointmentStatus, appointmentExam, appointmentTime} = useSelector(
		(state: RootState) => state.sort
	).sort;

	const {_status} = router.query;

	const listFilter: Array<any> = [
		{
			title: 'Chờ duyệt',
			icon: CalendarEdit,
			query: null,
			pathname: '/appointment-schedule',
		},
		{
			title: 'Đang diễn ra',
			icon: CalendarCircle,
			query: 'happenning',
			pathname: '/appointment-schedule',
		},
		{
			title: 'Kết thúc',
			icon: CalendarTick,
			query: 'end',
			pathname: '/appointment-schedule',
		},
	];

	// Handle clear filter
	const handleClear = () => {
		dispatch(
			updateSort({
				name: 'appointmentStatus',
				value: null,
			})
		);
		dispatch(
			updateSort({
				name: 'appointmentExam',
				value: null,
			})
		);
		dispatch(
			updateSort({
				name: 'appointmentTime',
				value: null,
			})
		);

		dispatch(
			updateSort({
				name: 'appointmentKeyword',
				value: '',
			})
		);
	};

	useEffect(() => {
		dispatch(
			updateSort({
				name: 'appointmentStatus',
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
		}/ManageBooking/export?AccountUuid=${accountId}${checkNullQuery(
			'AddressType',
			appointmentExam?.id
		)}${checkNullQuery('StatesId', appointmentStatus?.id)}${checkNullQuery(
			'From',
			convertDate(appointmentTime?.from).getDateSubmit()
		)}${checkNullQuery('StatesId', appointmentStatus?.id)}${checkNullQuery(
			'To',
			convertDate(appointmentTime?.to).getDateSubmit()
		)}`;
	}, [
		accountId,
		appointmentExam?.id,
		appointmentStatus?.id,
		appointmentTime?.from,
		appointmentTime?.to,
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
					isStatus={true}
					keyNameStatus='appointmentStatus'
					keyNameExam='appointmentExam'
					keyNameTime='appointmentTime'
					keyNameKeyword='appointmentKeyword'
					arrayStatus={
						!_status
							? listStatusWait
							: _status == 'happenning'
							? listStatusPenning
							: listStatusEnd
					}
				/>
			</div>
			<div className={styles.main}>
				{!_status && <TableAppointmentSchedule />}
				{_status == 'happenning' && <TableAppointmentPennding />}
				{_status == 'end' && <TableAppointmentEnd />}
			</div>
		</div>
	);
}

export default MainAppointmentSchedule;
