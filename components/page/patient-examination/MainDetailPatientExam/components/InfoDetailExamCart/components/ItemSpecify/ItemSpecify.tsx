import React, {Fragment, useEffect, useState} from 'react';
import styles from './ItemSpecify.module.scss';
import clsx from 'clsx';
import {RxDotFilled} from 'react-icons/rx';
import {Trash} from 'iconsax-react';
import {BsEye} from 'react-icons/bs';
import {TypeItemSpecify} from './interfaces';
import convertDate from '~/common/func/convertDate';
import Popup from '~/components/common/Popup';
import PopupDeleteDesignation from '~/components/popups/PopupDeleteDesignation';
import PopupIndicationDetail from '~/components/popups/PopupIndicationDetail';
import PopupConfirmIndication from '~/components/popups/PopupConfirmIndication';
import PopupDeleteIndication from '~/components/popups/PopupDeleteIndication';
import {ContextIndication} from '~/components/page/disease-indication/TableIndicationPendding/contextIndication';
import PopupCreateIndication from '~/components/popups/PopupCreateIndication';
import PopupSubmitResultIndication from '~/components/popups/PopupSubmitResultIndication';

function ItemSpecify({data}: TypeItemSpecify) {
	const [open, setOpen] = useState<boolean>(false);
	const [openDetail, setOpenDetail] = useState<boolean>(false);
	const [confirm, setConfirm] = useState<boolean>(false);
	const [deleteIndication, setDeleteIndication] = useState<boolean>(false);

	const [submitResult, setSubmitResult] = useState<boolean>(false);
	const [create, setCreate] = useState<boolean>(false);

	const [uuid, setUuid] = useState<string>('');

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

	return (
		<Fragment>
			<div className={styles.item_specify}>
				<div className={styles.col_1}>
					<p className={styles.type_specify}>{data?.name}</p>
					<p className={styles.des_specify}>
						{data?.description || 'Chưa cập nhật'}
					</p>
				</div>
				<div className={styles.col_2}>
					<p className={styles.time_create}>
						{convertDate(data?.timeCreated).getFullDateTime()}
					</p>
					<div
						className={clsx(styles.status, {
							[styles.DAXL]: data?.state.id == 1,
							[styles.DXL]: data?.state.id == 2,
							[styles.CXL]: data?.state.id == 3,
						})}
					>
						<div className={styles.dot}>
							<RxDotFilled size={20} />
						</div>
						<p className={styles.text_status}>
							{data?.state?.name}
						</p>
					</div>
				</div>
				<div className={styles.col_3}>
					<div className={styles.left}>
						<p className={styles.return}>Trả kết quả</p>
						<p className={styles.time}>
							{convertDate(data?.timeUpdated).getFullDateTime() ||
								'Chưa cập nhật'}
						</p>
					</div>
					<div className={styles.right}>
						{data?.isCanDelete && (
							<div
								className={clsx(styles.item, styles.cancel)}
								onClick={() => {
									setOpen(true);
									setUuid(data.uuid);
									setContextForm((prev: any) => ({
										...prev,
										uuidIndication: data.uuid,
									}));
								}}
							>
								<Trash size={16} />
							</div>
						)}

						<div
							className={clsx(styles.item, styles.detail)}
							onClick={() => {
								setOpenDetail(true);
								setUuid(data.uuid);
							}}
						>
							<BsEye size={16} />
						</div>
					</div>
				</div>
			</div>

			{/* Popup */}
			<Popup open={open} onClose={() => setOpen(false)}>
				<PopupDeleteDesignation
					uuid={uuid}
					onClose={() => setOpen(false)}
				/>
			</Popup>

			{/* ContextIndication */}
			<ContextIndication.Provider value={{contextForm, setContextForm}}>
				{/* Chi tiết chỉ định */}
				<Popup open={openDetail} onClose={() => setOpenDetail(false)}>
					<PopupIndicationDetail
						uuidIndication={uuid}
						onClose={() => setOpenDetail(false)}
						onOpenConfirmIndication={() => setConfirm(true)}
						onOpenDeleteIndication={() => setDeleteIndication(true)}
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

			{/* Xác nhận chỉ định */}
			<Popup open={confirm} onClose={() => setConfirm(false)}>
				<PopupConfirmIndication
					uuidIndication={uuid}
					onClose={() => setConfirm(false)}
				/>
			</Popup>

			{/* Xóa chỉ định */}
			<Popup
				open={deleteIndication}
				onClose={() => setDeleteIndication(false)}
			>
				<PopupDeleteIndication
					uuidIndication={uuid}
					onClose={() => setDeleteIndication(false)}
				/>
			</Popup>
		</Fragment>
	);
}

export default ItemSpecify;
