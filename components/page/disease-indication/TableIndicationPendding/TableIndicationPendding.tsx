import React, {Fragment, useEffect, useState} from 'react';
import styles from './TableIndicationPendding.module.scss';
import {TypeData, TypeTableIndicationPendding} from './interfaces';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import useDebounce from '~/common/hooks/useDebounce';
import {httpRequest} from '~/services';
import indicationService from '~/services/indicationService';
import convertDate from '~/common/func/convertDate';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import backgrounds from '~/constants/images/backgrounds';
import Table from '~/components/common/Table';
import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import {BsEye} from 'react-icons/bs';
import Popup from '~/components/common/Popup';
import PopupIndicationDetail from '~/components/popups/PopupIndicationDetail';
import Pagination from '~/components/controls/Pagination';
import PopupSubmitResultIndication from '~/components/popups/PopupSubmitResultIndication';
import PopupCreateIndication from '~/components/popups/PopupCreateIndication';
import {Add} from 'iconsax-react';
import {ContextIndication} from './contextIndication';

function TableIndicationPendding({}: TypeTableIndicationPendding) {
	const router = useRouter();

	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);

	const {indication, typeIndication, timeIndication, keywordIndication} =
		useSelector((state: RootState) => state.sort).sort;
	const keyword = useDebounce(keywordIndication, 1000);

	const [limit, setLimit] = useState<number>(10);
	const [page, setPage] = useState<number>(1);
	const [total, setTotal] = useState(10);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<Array<TypeData>>([]);
	const [uuidIndication, setUuidIndication] = useState<string>('');

	// Popup
	const [submitResult, setSubmitResult] = useState<boolean>(false);
	const [create, setCreate] = useState<boolean>(false);
	const [openDetail, setOpenDetail] = useState<boolean>(false);

	// Context form
	const [contextForm, setContextForm] = useState<{
		uuidIndication: string;
		result: string;
		images: Array<any>;
	}>({
		uuidIndication: '',
		result: '',
		images: [],
	});

	// Set lại context form khi thay đổi chỉ định
	useEffect(() => {
		setContextForm((prev: any) => ({
			...prev,
			result: '',
			images: [],
		}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [contextForm?.uuidIndication]);

	// Call api danh sách
	useEffect(() => {
		httpRequest({
			setLoading: setLoading,
			http: indicationService.getIndicationDoing({
				token: token!,
				uuid: accountId as string,
				Page: page,
				Limit: limit,
				Keyword: keyword || '',
				Designation: indication?.uuid,
				Type: typeIndication?.id,
				TimeDesignation: convertDate(timeIndication).getDateSubmit(),
			}),
		}).then((data) => {
			if (data) {
				setData(data?.medicalRecordDesignations?.items);
				setTotal(
					data?.medicalRecordDesignations?.pagination?.totalCount
				);
			}
		});
	}, [
		accountId,
		indication,
		keyword,
		page,
		router,
		timeIndication,
		typeIndication,
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
							title='Chưa có chỉ định'
							des='Có vẻ như bạn chưa có phiếu chỉ định nào đang xử lý.'
						/>
					}
				>
					<div className={styles.table}>
						<Table
							data={data}
							column={[
								{
									title: 'Mã phiếu',
									render: (item: TypeData) => (
										<Tippy
											content='Mã phiếu '
											placement='top'
										>
											<p
												className={clsx(
													styles.fit_content,
													'hover_text'
												)}
												onClick={() => {
													setOpenDetail(true);
													setUuidIndication(
														item.uuid
													);
												}}
											>
												{item.code}
											</p>
										</Tippy>
									),
								},
								{
									title: 'Chỉ định',
									render: (item: TypeData) => (
										<Tippy
											content='Xem chi tiết'
											placement='top'
										>
											<div className={styles.box_name}>
												<p
													className={styles.name}
													onClick={() => {
														setOpenDetail(true);
														setUuidIndication(
															item.uuid
														);
													}}
												>
													{item.name}
												</p>
											</div>
										</Tippy>
									),
								},
								{
									title: 'Loại chỉ định',
									render: (item: TypeData) => (
										<p>{item?.type?.name}</p>
									),
								},
								{
									title: 'Mô tả',
									render: (item: TypeData) => (
										<p className={styles.des}>
											{item?.description}
										</p>
									),
								},
								{
									title: 'Bệnh nhân',
									render: (item: TypeData) => (
										<p>{item?.patientName}</p>
										// <div className={styles.info}>
										// 	<Avatar
										// 		src={`${process.env.NEXT_PUBLIC_URL_FILE}/${item.image}`}
										// 		className={styles.avatar}
										// 	/>
										// 	<p className={styles.name}>
										// 		{item.patientName}
										// 	</p>
										// </div>
									),
								},
								{
									title: 'Thời gian',
									render: (item: TypeData) => (
										<p>
											{convertDate(
												item.createAt
											).getFullDateTime()}
										</p>
									),
								},
								{
									title: '',
									render: (item: TypeData) => (
										<div className={styles.control}>
											{/* Tạo kết quả chỉ định */}
											<Tippy
												content='Tạo kết quả chỉ định'
												placement='left'
											>
												<div
													className={clsx(
														styles.item,
														styles.browse
													)}
													onClick={() => {
														setCreate(true);
														setContextForm(
															(prev: any) => ({
																...prev,
																uuidIndication:
																	item.uuid,
															})
														);
													}}
												>
													<Add size={16} />
												</div>
											</Tippy>

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
														setOpenDetail(true);
														setUuidIndication(
															item.uuid
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
				{data?.length > 0 && (
					<div className={styles.pagination}>
						<Pagination
							pageCurrent={page}
							pageSize={limit}
							onSetPage={setPage}
							onSetPageSize={setLimit}
							totalItem={total}
							textResult='chỉ định'
						/>
					</div>
				)}
			</div>
			{/* Popup */}
			{/* ContextIndication */}
			<ContextIndication.Provider value={{contextForm, setContextForm}}>
				{/* Chi tiết chỉ định */}
				<Popup open={openDetail} onClose={() => setOpenDetail(false)}>
					<PopupIndicationDetail
						uuidIndication={uuidIndication}
						onClose={() => setOpenDetail(false)}
						onOpenCreateResult={() => setCreate(true)}
					/>
				</Popup>

				{/* Tạo chỉ định */}
				<Popup open={create} onClose={() => setCreate(false)}>
					<PopupCreateIndication
						onClose={() => setCreate(false)}
						onOpenPopupSubmitResult={() => setSubmitResult(true)}
					/>
				</Popup>

				{/* Gửi kết quả  */}
				<Popup
					open={submitResult}
					onClose={() => setSubmitResult(false)}
				>
					<PopupSubmitResultIndication
						onClose={() => setSubmitResult(false)}
						onOpenPopupCreate={() => setCreate(true)}
					/>
				</Popup>
			</ContextIndication.Provider>
		</Fragment>
	);
}

export default TableIndicationPendding;
