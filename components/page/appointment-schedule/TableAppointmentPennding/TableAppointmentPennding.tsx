import {Fragment, useEffect, useState} from 'react';
import Pagination from '~/components/controls/Pagination';
import styles from './TableAppointmentPennding.module.scss';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import backgrounds from '~/constants/images/backgrounds';
import Table from '../../../common/Table/Table';
import Avatar from '~/components/common/Avatar/Avatar';
import CheckTypeExam from '~/components/common/CheckTypeExam';
import {BsEye} from 'react-icons/bs';
import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import Popup from '~/components/common/Popup';
import PopupDetailExam from '~/components/popups/PopupDetailExam/PopupDetailExam';
import CheckTypeStatus from '~/components/common/CheckTypeStatus';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import useDebounce from '~/common/hooks/useDebounce';
import {httpRequest} from '~/services';
import manageBooking from '~/services/manageBooking';
import convertDate from '~/common/func/convertDate';
import {TypeData} from '../MainAppointmentSchedule/interfaces';
import {useRouter} from 'next/router';
import {useQuery} from 'react-query';
import {QUERY_APPOINTMENT_SCHEDULE} from '~/constants/mock/enum';

function TableAppointmentPennding() {
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
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);

	const {data, isLoading} = useQuery(
		[
			QUERY_APPOINTMENT_SCHEDULE.PENNING, // KEY REACT QUERY
			accountId,
			appointmentExam,
			appointmentStatus,
			appointmentTime,
			keyword,
			page,
			limit,
			token,
		],
		() =>
			httpRequest({
				http: manageBooking.getInfoBookingPenning({
					token: token!,
					uuid: accountId as string,
					Keyword: keyword,
					StateId: appointmentStatus?.id,
					AddressType: appointmentExam?.id,
					From: convertDate(appointmentTime?.from).getDateSubmit(),
					To: convertDate(appointmentTime?.to).getDateSubmit(),
					Limit: limit,
					Page: page,
				}),
			}).then((data) => {
				return {
					items: data.tickets.items || [],
					total: data.tickets.pagination.totalCount || 0,
				};
			})
	);

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
				/>
			</Popup>
		</Fragment>
	);
}

export default TableAppointmentPennding;
