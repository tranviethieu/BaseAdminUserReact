import clsx from 'clsx';

import styles from './PopupIndicationDetail.module.scss';
import {IoCloseOutline, IoCloseSharp} from 'react-icons/io5';
import {BsCheck2} from 'react-icons/bs';
import {Add, Cake} from 'iconsax-react';
import {TbGenderMale} from 'react-icons/tb';
import ImageFill from '~/components/common/ImageFill';
import {TypeDetailIndication, TypePopupIndicationDetail} from './interfaces';
import CheckStatusIndication from '~/components/common/CheckStatusIndication';
import {Fragment, useContext, useEffect, useState} from 'react';
import {GENDER, STATUS_INDICATION} from '~/constants/mock/enum';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import convertDate from '~/common/func/convertDate';
import {MdOutlineFemale} from 'react-icons/md';
import {IoMdTransgender} from 'react-icons/io';
import LoadingData from '~/components/common/LoadingData';
import {httpRequest} from '~/services';
import indicationService from '~/services/indicationService';
import {toastError} from '~/common/func/toast';
import ListImage from '~/components/controls/ListImage/ListImage';
import {TypeContext} from '~/components/page/disease-indication/TableIndicationPendding/interfaces';
import {ContextIndication} from '~/components/page/disease-indication/TableIndicationPendding/contextIndication';

function PopupIndicationDetail({
	uuidIndication,
	onClose,
	onOpenConfirmIndication,
	onOpenDeleteIndication,
	onOpenCreateResult,
}: TypePopupIndicationDetail) {
	// Context
	const contextIndication = useContext<TypeContext>(ContextIndication);

	const {token} = useSelector((state: RootState) => state.auth);
	const {accountId} = useSelector((state: RootState) => state.user);

	// State
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<TypeDetailIndication>();

	// Call api
	useEffect(() => {
		if (accountId && uuidIndication && token) {
			httpRequest({
				setError: (err) => toastError({msg: err}),
				setLoading: setLoading,
				http: indicationService.detailIndication({
					token: token!,
					AccountUuid: accountId as string,
					uuid: uuidIndication,
				}),
			}).then((data) => {
				if (data) {
					setData(data);
				}
			});
		}
	}, [uuidIndication, accountId]);

	return (
		<Fragment>
			<LoadingData isLoading={loading}>
				<div className={clsx('effectZoom', styles.container)}>
					<h4 className={styles.title}>
						Phiếu chỉ định {data?.code}
					</h4>
					<div className={styles.group_btn}>
						{data?.state?.id == STATUS_INDICATION.CHO_XU_LY && (
							<Fragment>
								<div
									className={styles.btn}
									onClick={() => {
										onClose();
										onOpenConfirmIndication &&
											onOpenConfirmIndication();
									}}
								>
									<div className={styles.icon}>
										<BsCheck2 size={20} color='#4CD28A' />
									</div>
									<p className={styles.text_btn}>Xác nhận</p>
								</div>
								<div
									className={styles.btn}
									onClick={() => {
										onClose();
										onOpenDeleteIndication &&
											onOpenDeleteIndication();
									}}
								>
									<div className={styles.icon}>
										<IoCloseSharp
											size={20}
											color='#FF6A55'
										/>
									</div>
									<p className={styles.text_btn}>
										Xóa chỉ định
									</p>
								</div>
							</Fragment>
						)}

						{data?.state?.id == STATUS_INDICATION.DANG_XU_LY && (
							<div
								className={styles.btn}
								onClick={() => {
									onClose();
									contextIndication.setContextForm(
										(prev: any) => ({
											...prev,
											uuidIndication: data.uuid,
										})
									);
									onOpenCreateResult && onOpenCreateResult();
								}}
							>
								<div className={styles.icon}>
									<Add size={20} color='#0071FF' />
								</div>
								<p className={styles.text_btn}>Tạo kết quả</p>
							</div>
						)}
					</div>

					<div className={styles.top}>
						<h4 className={styles.title_top}>Thông tin</h4>
						<CheckStatusIndication type={Number(data?.state?.id)} />
					</div>
					<div className={styles.item}>
						<p className={styles.tag}>Chỉ định:</p>
						<p className={styles.tag}>{data?.name}</p>
					</div>
					<div className={styles.item}>
						<p className={styles.tag}>Loại chỉ định:</p>
						<p className={styles.tag}>{data?.type?.name}</p>
					</div>
					<div className={styles.item}>
						<p className={styles.tag}>Mô tả:</p>
						<p className={styles.tag}>{data?.description}</p>
					</div>
					<div className={styles.item}>
						<p className={styles.tag}>Ngày tạo:</p>
						<p className={styles.tag}>
							{convertDate(data?.createAt).getFullDateTime()}
						</p>
					</div>

					<div className={styles.line}></div>

					<h4 className={styles.head}>Bệnh nhân</h4>
					<div className={styles.user_info}>
						<div className={styles.avatar}>
							<ImageFill
								src={`${process.env.NEXT_PUBLIC_URL_FILE}/${data?.patient?.image}`}
								style_1_1
								className={styles.image}
							/>
							<div
								className={clsx(styles.gender, {
									[styles.male]:
										data?.patient?.gender?.id == GENDER.NAM,
								})}
							>
								<div className={styles.icon_female}>
									{/* Giới tính  */}
									{data?.patient?.gender?.id == GENDER.NAM ? (
										<TbGenderMale size={12} color='#fff' />
									) : data?.patient.gender.id == GENDER.NU ? (
										<MdOutlineFemale
											size={12}
											color='#fff'
										/>
									) : (
										<IoMdTransgender
											size={12}
											color='#fff'
										/>
									)}
								</div>
							</div>
						</div>

						<div className={styles.box_des}>
							<h4 className={styles.name}>
								{data?.patient?.fullName}
							</h4>
							<div className={styles.des_item}>
								<div className={styles.icon_des}>
									<Cake size={16} variant='Bold' />
								</div>
								<p className={styles.text_des}>
									{convertDate(
										data?.patient?.dateOfBirth
									).getDateFormat()}
								</p>
							</div>
						</div>
					</div>

					{data?.result ? (
						<Fragment>
							<div className={styles.line}></div>
							<h4 className={styles.head}>Kết quả chỉ định</h4>
							<div className={styles.flex}>
								{/* <p className={styles.doctorConclusion}>
									Người đọc:{' '}
									{data?.result?.doctorConclusion?.name}
								</p> */}
								<p className={styles.des}>
									{data?.result?.resultText}
								</p>
								<p className={styles.doctorConclusion}>
									{convertDate(
										data?.result?.updateAt
									).getFullDateTime()}{' '}
								</p>
							</div>

							<ListImage images={data?.result?.images} />
						</Fragment>
					) : (
						<Fragment>
							<div className={styles.line}></div>
							<h4 className={styles.head}>Kết quả chỉ định</h4>
							<p className={styles.des}>
								'Hiện tại chưa có kết quả chỉ định'
							</p>
						</Fragment>
					)}

					<div className={styles.close} onClick={onClose}>
						<IoCloseOutline size={24} />
					</div>
				</div>
			</LoadingData>
		</Fragment>
	);
}

export default PopupIndicationDetail;
