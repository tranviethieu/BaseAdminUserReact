import {Fragment, useState} from 'react';
import Pagination from '~/components/controls/Pagination';
import styles from './TableAppointmentSchedule.module.scss';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import backgrounds from '~/constants/images/backgrounds';
import Table from '../../../common/Table/Table';
import Avatar from '~/components/common/Avatar/Avatar';
import CheckTypeExam from '~/components/common/CheckTypeExam';
import {BsCheck2, BsEye} from 'react-icons/bs';
import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import {IoCloseSharp} from 'react-icons/io5';
import Popup from '~/components/common/Popup';
import PopupBrowseExam from '~/components/popups/PopupBrowseExam';
import PopupCancelExam from '~/components/popups/PopupCancelExam';
import PopupDetailExam from '~/components/popups/PopupDetailExam/PopupDetailExam';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {httpRequest} from '~/services';
import manageBooking from '~/services/manageBooking';
import convertDate from '~/common/func/convertDate';
import useDebounce from '~/common/hooks/useDebounce';
import {TypeData} from '../MainAppointmentSchedule/interfaces';
import {useRouter} from 'next/router';
import CheckTypeStatus from '~/components/common/CheckTypeStatus';
import {
	QUERY_APPOINTMENT_SCHEDULE,
	STATUS_EXAM,
	TYPE_EXAM,
} from '~/constants/mock/enum';
import {Stickynote} from 'iconsax-react';
import PopupConfirmExam from '~/components/popups/PopupConfirmExam';
import {useQuery} from 'react-query';

function TableAppointmentSchedule() {
	const router = useRouter();

	const {uuid, ...rest} = router.query;

	const {accountId} = useSelector((state: RootState) => state.user);
	const {
		appointmentStatus,
		appointmentExam,
		appointmentTime,
		appointmentKeyword,
	} = useSelector((state: RootState) => state.sort).sort;
	const {token} = useSelector((state: RootState) => state.auth);

	const keyword = useDebounce(appointmentKeyword || '', 1000);

	// STATE
	const [limit, setLimit] = useState<number>(10);
	const [page, setPage] = useState<number>(1);
	const [ticketUuid, setTicketUuid] = useState<string>('');
	const [namePatient, setNamePatient] = useState<string>('');

	// Popup
	const [openBrowse, setOpenBrowse] = useState<boolean>(false);
	const [openConfirm, setOpenConfirm] = useState<boolean>(false);
	const [openCancel, setOpenCancel] = useState<boolean>(false);

	const {data, isLoading} = useQuery({
		queryKey: [
			QUERY_APPOINTMENT_SCHEDULE.WAIT, // KEY REACT QUERY
			accountId,
			appointmentExam,
			appointmentStatus,
			appointmentTime,
			keyword,
			page,
			limit,
			token,
		],
		queryFn: async () => {
			const res = await httpRequest({
				http: manageBooking.getInfoBookingWait({
					token: token!,
					uuid: accountId as string,
					Keyword: keyword,
					AddressType: appointmentExam?.id,
					StateId: appointmentStatus?.id,
					From: convertDate(appointmentTime?.from).getDateSubmit(),
					To: convertDate(appointmentTime?.to).getDateSubmit(),
					Limit: limit,
					Page: page,
				}),
			});
			if (res) {
				return {
					items: res.tickets.items || [],
					total: res.tickets.pagination.totalCount || 0,
				};
			}
		},
	});

	return (
		<Fragment>
			<div className={styles.container}>
				<DataWrapper
					loading={isLoading}
					data={data?.items}
					noti={
						<Noti
							img={backgrounds.table_noti}
							title='Chưa có lịch'
							des='Hiện tại bạn chưa có lịch hẹn khám nào.'
						/>
					}
				>
					<div className={styles.table}>
						<Table
							data={data?.items}
							column={[
								{
									className: styles.title,
									title: 'Mã đặt khám',
									render: (item: TypeData) => (
										<Tippy
											content='Xem chi tiết'
											placement='top'
										>
											<p
												className={clsx(
													styles.fit_content,
													'hover_text'
												)}
												onClick={() => {
													router.replace(
														{
															pathname:
																router.pathname,
															query: {
																...router.query,
																uuid: item.uuid,
															},
														},
														undefined,
														{
															shallow: true,
															scroll: false,
														}
													);
												}}
											>
												{item.code}
											</p>
										</Tippy>
									),
								},
								{
									title: ' Bệnh nhân',
									render: (item: TypeData) => (
										<div className={styles.info}>
											<Avatar
												src={`${process.env.NEXT_PUBLIC_URL_FILE}/${item.image}`}
												className={styles.avatar}
											/>
											<p className={styles.name}>
												{item.patientName}
											</p>
										</div>
									),
								},
								{
									title: 'Số điện thoại',
									render: (item: TypeData) => (
										<>{item.phone}</>
									),
								},
								{
									title: 'Thời gian đến khám',
									render: (item: TypeData) => (
										<p>
											{convertDate(
												item.timeExam
											).getFullDateTime()}
										</p>
									),
								},
								{
									title: 'Hình thức khám',
									render: (item: TypeData) => (
										<CheckTypeExam
											type={item?.addressType?.id}
										/>
									),
								},
								{
									title: 'Trạng thái',
									render: (item: TypeData) => (
										<CheckTypeStatus type={item.state.id} />
									),
								},
								{
									title: '',
									render: (item: TypeData) => (
										<div className={styles.control}>
											{/* Duyệt lịch khám */}
											{item.state.id ==
												STATUS_EXAM.DA_XAC_NHAN && (
												<Tippy
													content='Duyệt lịch khám'
													placement='top'
												>
													<div
														className={clsx(
															styles.item,
															styles.browse
														)}
														onClick={() => {
															setOpenBrowse(true);
															setTicketUuid(
																item.uuid
															);
															setNamePatient(
																item.patientName
															);
														}}
													>
														<BsCheck2
															size={16}
															color='#4CD28A'
														/>
													</div>
												</Tippy>
											)}

											{/* Xác nhận khám */}
											{item.state.id ==
												STATUS_EXAM.DA_DUYET &&
												(item.addressType.id ==
													TYPE_EXAM.TAI_NHA ||
													item.addressType.id ==
														TYPE_EXAM.TRUC_TUYEN) && (
													<Tippy
														content='Bác sĩ xác nhận tới khám'
														placement='top'
													>
														<div
															className={clsx(
																styles.item,
																styles.browse
															)}
															onClick={() => {
																setOpenConfirm(
																	true
																);
																setTicketUuid(
																	item.uuid
																);
																setNamePatient(
																	item.patientName
																);
															}}
														>
															<Stickynote
																size={16}
																color='#4CD28A'
															/>
														</div>
													</Tippy>
												)}

											{/* Từ chối khám bệnh */}
											{item.state.id !=
												STATUS_EXAM.DA_DUYET && (
												<Tippy
													content='Từ chối khám bệnh'
													placement='top'
												>
													<div
														className={clsx(
															styles.item,
															styles.cancel
														)}
														onClick={() => {
															setOpenCancel(true);
															setTicketUuid(
																item.uuid
															);
															setNamePatient(
																item.patientName
															);
														}}
													>
														<IoCloseSharp
															size={16}
															color='#FF6A55'
														/>
													</div>
												</Tippy>
											)}

											{/* Xem chi tiết */}
											<Tippy
												content='Xem chi tiết'
												placement='top'
											>
												<div
													className={clsx(
														styles.item,
														styles.detail
													)}
													onClick={() => {
														router.replace(
															{
																pathname:
																	router.pathname,
																query: {
																	...router.query,
																	uuid: item.uuid,
																},
															},
															undefined,
															{
																shallow: true,
																scroll: false,
															}
														);
													}}
												>
													<BsEye
														size={16}
														color='#303C4F'
													/>
												</div>
											</Tippy>
										</div>
									),
								},
							]}
						/>
					</div>
				</DataWrapper>
				{data?.items.length > 0 && (
					<div className={styles.pagination}>
						<Pagination
							pageCurrent={page}
							pageSize={limit}
							onSetPage={setPage}
							onSetPageSize={setLimit}
							totalItem={data?.total}
							textResult='lịch hẹn khám'
						/>
					</div>
				)}
			</div>

			{/* Popup */}
			{/* Xác nhận lịch khám */}
			<Popup open={openBrowse} onClose={() => setOpenBrowse(false)}>
				<PopupBrowseExam
					ticketUuid={ticketUuid}
					namePatient={namePatient}
					onClose={() => setOpenBrowse(false)}
				/>
			</Popup>

			{/* Xác nhận khám */}
			<Popup open={openConfirm} onClose={() => setOpenConfirm(false)}>
				<PopupConfirmExam
					ticketUuid={ticketUuid}
					namePatient={namePatient}
					onClose={() => setOpenConfirm(false)}
				/>
			</Popup>

			{/* Hủy khám */}
			<Popup open={openCancel} onClose={() => setOpenCancel(false)}>
				<PopupCancelExam
					ticketUuid={ticketUuid}
					namePatient={namePatient}
					onClose={() => setOpenCancel(false)}
				/>
			</Popup>

			{/* Xem chi tiết */}
			<Popup
				open={!!uuid}
				onClose={() =>
					router.replace(
						{
							pathname: router.pathname,
							query: {
								...rest,
							},
						},
						undefined,
						{shallow: true, scroll: false}
					)
				}
			>
				<PopupDetailExam
					setTicketUuid={setTicketUuid}
					setNamePatient={setNamePatient}
					onClose={() =>
						router.replace(
							{
								pathname: router.pathname,
								query: {
									...rest,
								},
							},
							undefined,
							{shallow: true, scroll: false}
						)
					}
					onOpenBrowseExam={() => setOpenBrowse(true)}
					onOpenCancelExam={() => setOpenCancel(true)}
					onOpenConfirmExam={() => setOpenConfirm(true)}
				/>
			</Popup>
		</Fragment>
	);
}

export default TableAppointmentSchedule;
