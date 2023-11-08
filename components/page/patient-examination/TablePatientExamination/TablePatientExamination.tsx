import {Fragment, useEffect, useState} from 'react';
import Pagination from '~/components/controls/Pagination';
import styles from './TablePatientExamination.module.scss';
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
import PopupConfirmExamCart from '~/components/popups/PopupConfirmExamCart';
import PopupCancelExamCart from '~/components/popups/PopupCancelExamCart/PopupCancelExamCart';
import Link from 'next/link';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {useRouter} from 'next/router';
import useDebounce from '~/common/hooks/useDebounce';
import {TypeData} from '../MainPatientExamination/interfaces';
import {httpRequest} from '~/services';
import medicalRecord from '~/services/medicalRecord';
import convertDate from '~/common/func/convertDate';

function TablePatientExamination() {
	const router = useRouter();

	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);
	const {medicalExam, medicalTime, medicalKeyword} = useSelector(
		(state: RootState) => state.sort
	).sort;

	const keyword = useDebounce(medicalKeyword || '', 1000);

	// STATE
	const [limit, setLimit] = useState<number>(10);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState(10);
	const [loading, setLoading] = useState(false);
	const [ticketUuid, setTicketUuid] = useState<string>('');
	const [namePatient, setNamePatient] = useState<string>('');
	const [data, setData] = useState<Array<TypeData>>([]);

	// Popup
	const [openConfirm, setOpenConfirm] = useState<boolean>(false);
	const [openCancel, setOpenCancel] = useState<boolean>(false);

	// Call api
	useEffect(() => {
		httpRequest({
			setLoading: setLoading,
			http: medicalRecord.getMedicalRecordWait({
				token: token!,
				AccountUuid: accountId as string,
				Page: page,
				Limit: limit,
				Keyword: keyword || '',
				State: null,
				AddressType: medicalExam?.id,
				From: convertDate(medicalTime?.from).getDateSubmit(),
				To: convertDate(medicalTime?.to).getDateSubmit(),
			}),
		}).then((data) => {
			if (data) {
				setData(data.items);
				setTotal(data.pagination.totalCount);
			}
		});
	}, [
		token,
		accountId,
		medicalExam,
		keyword,
		page,
		medicalTime,
		router,
		limit,
		token,
	]);

	return (
		<Fragment>
			<div className={styles.container}>
				<DataWrapper
					loading={loading}
					data={data}
					noti={
						<Noti
							img={backgrounds.table_noti}
							title='Chưa có phiếu khám'
							des='Có vẻ như bạn chưa có phiếu khám nào đang chờ khám.'
						/>
					}
				>
					<div className={styles.table}>
						<Table
							data={data}
							column={[
								{
									title: 'Mã phiếu khám',
									render: (item: TypeData) => (
										<Tippy
											content='Xem chi tiết'
											placement='top'
										>
											<Link
												className={'hover_text'}
												href={`/patient-examination/detail/${item.uuid}`}
											>
												{item.code}
											</Link>
										</Tippy>
									),
								},
								{
									title: 'Mã đặt khám',
									render: (item: TypeData) => (
										<>{item.ticketCode}</>
									),
								},
								{
									title: 'Mã bệnh nhân',
									render: (item: TypeData) => (
										<p className='td'>
											{item.patient.code}
										</p>
									),
								},
								{
									title: ' Bệnh nhân',
									render: (item: TypeData) => (
										<div className={clsx(styles.info)}>
											<Avatar
												src={`${process.env.NEXT_PUBLIC_URL_FILE}/${item.patient.image}`}
												className={styles.avatar}
											/>
											<p className={styles.name}>
												{item.patient.name}
											</p>
										</div>
									),
								},
								{
									title: 'Thời gian khám',
									render: (item: TypeData) => (
										<p className={styles.timeCreated}>
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
											type={Number(item.addressType.id)}
										/>
									),
								},
								{
									title: '',
									render: (item: TypeData) => (
										<div className={styles.control}>
											{/* Duyệt lịch khám */}
											<Tippy
												content='Bác sĩ xác nhận bắt đầu khám'
												placement='top'
											>
												<div
													className={clsx(
														styles.item,
														styles.browse
													)}
													onClick={() => {
														setOpenConfirm(true);
														setTicketUuid(
															item.uuid
														);
														setNamePatient(
															item.patient.name
														);
													}}
												>
													<BsCheck2 size={16} />
												</div>
											</Tippy>

											{/* Từ chối khám bệnh */}
											<Tippy
												content='Hủy phiếu khám'
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
															item.patient.name
														);
													}}
												>
													<IoCloseSharp size={16} />
												</div>
											</Tippy>

											{/* Xem chi tiết */}
											<Tippy
												content='Xem chi tiết'
												placement='top'
											>
												<Link
													href={`/patient-examination/detail/${item.uuid}`}
													className={clsx(
														styles.item,
														styles.detail
													)}
												>
													<BsEye size={16} />
												</Link>
											</Tippy>
										</div>
									),
								},
							]}
						/>
					</div>
				</DataWrapper>
				{data.length > 0 && (
					<div className={styles.pagination}>
						<Pagination
							pageCurrent={page}
							pageSize={limit}
							onSetPage={setPage}
							onSetPageSize={setLimit}
							totalItem={total}
							textResult='phiếu khám bệnh'
						/>
					</div>
				)}
			</div>

			{/* Popup */}
			<Popup open={openConfirm} onClose={() => setOpenConfirm(false)}>
				<PopupConfirmExamCart
					ticketUuid={ticketUuid}
					namePatient={namePatient}
					onClose={() => setOpenConfirm(false)}
				/>
			</Popup>

			<Popup open={openCancel} onClose={() => setOpenCancel(false)}>
				<PopupCancelExamCart
					ticketUuid={ticketUuid}
					namePatient={namePatient}
					onClose={() => setOpenCancel(false)}
				/>
			</Popup>
		</Fragment>
	);
}

export default TablePatientExamination;
