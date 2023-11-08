import React, {useEffect, useState} from 'react';

import styles from './PopupDetailExam.module.scss';
import clsx from 'clsx';
import {TypeDetailExam, TypePopupDetailExam} from './interfaces';
import {IoCloseOutline, IoCloseSharp} from 'react-icons/io5';
import {BsCheck2} from 'react-icons/bs';
import {MdOutlineFemale} from 'react-icons/md';
import CheckTypeExam from '~/components/common/CheckTypeExam';
import ImageFill from '~/components/common/ImageFill/ImageFill';
import {TbGenderMale} from 'react-icons/tb';
import {Cake, Call, Stickynote} from 'iconsax-react';
import ListImage from '~/components/controls/ListImage';
import CheckTypeStatus from '~/components/common/CheckTypeStatus';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {httpRequest} from '~/services';
import manageBooking from '~/services/manageBooking';
import convertDate from '~/common/func/convertDate';
import {GENDER, STATUS_EXAM, TYPE_EXAM} from '~/constants/mock/enum';
import {IoMdTransgender} from 'react-icons/io';
import LoadingData from '~/components/common/LoadingData';
import {useRouter} from 'next/router';

function PopupDetailExam({
	setTicketUuid,
	setNamePatient,
	onClose,
	onOpenBrowseExam,
	onOpenCancelExam,
	onOpenConfirmExam,
}: TypePopupDetailExam) {
	const router = useRouter();

	const {uuid, ...rest} = router.query;

	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);

	const [loading, setLoading] = useState<boolean>(false);
	const [images, setImages] = useState<Array<string>>([]);
	const [data, setData] = useState<TypeDetailExam>();

	// Call api
	useEffect(() => {
		if (accountId && uuid) {
			httpRequest({
				setLoading: setLoading,
				http: manageBooking.getDetailBooking({
					token: token!,
					uuid: accountId as string,
					ticketUuid: uuid as string,
				}),
			}).then((data) => {
				if (data) {
					setData(data);
					setImages(data.patient.symptonImages);
				} else {
					onClose();
				}
			});
		}
	}, [uuid, accountId, token]);

	return (
		<LoadingData isLoading={loading}>
			<div className={clsx('effectZoom', styles.container)}>
				<h4 className={styles.title}>Lịch đặt khám {data?.code}</h4>

				{/* Trạng thái chờ duyệt ==> group btn */}
				{/* Trạng thái chờ xác nhận ==>  btn xác nhận */}
				{/* Trạng thái hoàn thành, đã hủy, từ chối ==>  bỏ hết btn */}
				<div className={styles.group_btn}>
					{data?.state.id == STATUS_EXAM.DA_XAC_NHAN && (
						<>
							<div
								className={styles.btn}
								onClick={() => {
									onClose();
									setTicketUuid && setTicketUuid(data.uuid);
									onOpenBrowseExam && onOpenBrowseExam();
									setNamePatient &&
										setNamePatient(data?.patient?.name);
								}}
							>
								<div className={styles.icon}>
									<BsCheck2 size={20} color='#4CD28A' />
								</div>
								<p className={styles.text_btn}>Duyệt</p>
							</div>
							<div
								className={styles.btn}
								onClick={() => {
									onClose();
									setTicketUuid && setTicketUuid(data.uuid);
									onOpenCancelExam && onOpenCancelExam();
									setNamePatient &&
										setNamePatient(data?.patient?.name);
								}}
							>
								<div className={styles.icon}>
									<IoCloseSharp size={20} color='#FF6A55' />
								</div>
								<p className={styles.text_btn}>Từ chối</p>
							</div>
						</>
					)}

					{/* btn xác nhận */}
					{data?.state.id == STATUS_EXAM.DA_DUYET &&
						(data.addressType.id == TYPE_EXAM.TAI_NHA ||
							data.addressType.id == TYPE_EXAM.TRUC_TUYEN) && (
							<div
								className={styles.btn}
								onClick={() => {
									onClose();
									setTicketUuid && setTicketUuid(data.uuid);
									onOpenConfirmExam && onOpenConfirmExam();
									setNamePatient &&
										setNamePatient(data?.patient?.name);
								}}
							>
								<div className={styles.icon}>
									<Stickynote size={20} color='#0071FF' />
								</div>
								<p className={styles.text_btn}>Xác nhận khám</p>
							</div>
						)}
				</div>

				<div className={styles.line}></div>

				{/* Thông tin */}
				<div className={styles.box_info}>
					<h4 className={styles.head}>Thông tin</h4>
					<div className={styles.item}>
						<p className={styles.tag}>Hình thức khám:</p>
						<CheckTypeExam type={Number(data?.addressType?.id)} />
					</div>

					<div className={styles.item}>
						<p className={styles.tag}>Thời gian đặt khám:</p>
						<p className={styles.tag}>
							{convertDate(data?.createAt).getFullDateTime()}
						</p>
					</div>
					<div className={styles.item}>
						<p className={styles.tag}>Thời gian khám:</p>
						<p className={styles.tag}>
							{convertDate(data?.timeExam).getFullDateTime()}
						</p>
					</div>

					{/* Lý do hủy khám */}
					{data?.note && (
						<div className={styles.item}>
							<p className={styles.tag}>Lý do từ chối:</p>
							<p className={styles.tag}>{data.note}</p>
						</div>
					)}

					{/* Khám gói dịch vụ  */}
					{data?.service?.id && (
						<div className={styles.item}>
							<p className={styles.tag}>Khám gói dịch vụ:</p>
							<p className={styles.tag}>{data.service?.name}</p>
						</div>
					)}

					{/* Khám tại nhà */}
					{data?.addressType.id == TYPE_EXAM.TAI_NHA && (
						<div className={styles.item}>
							<p className={styles.tag}>Địa chỉ khám:</p>
							<p className={styles.tag}>
								{`${data?.address?.specificAddress}, ${data?.address?.ward?.name}, ${data?.address.district.name}, ${data?.address.province.name}`}
							</p>
						</div>
					)}

					{/* Trạng thái phiếu khám */}
					<div className={styles.type_status}>
						<CheckTypeStatus type={Number(data?.state.id)} />
					</div>
				</div>

				<div className={styles.line}></div>

				{/* Thông tin người khám */}
				<div className={styles.username}>
					<h4 className={styles.head}>Thông tin</h4>
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
											size={14}
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
								{data?.patient?.name}
							</h4>
							<div className={styles.des_item}>
								<div className={styles.icon_des}>
									<Cake size={16} variant='Bold' />
								</div>
								<p className={styles.text_des}>
									{convertDate(
										data?.patient.birthDay
									).getDateFormat()}
								</p>
							</div>
							<div className={styles.des_item}>
								<div className={styles.icon_des}>
									<Call size={16} variant='Bold' />
								</div>
								<p className={styles.text_des}>
									{data?.patient.phone}
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Triệu chứng */}
				<div className={styles.symptom}>
					<h4 className={styles.head}>Triệu chứng</h4>
					<p className={styles.text_symptom}>
						{data?.patient?.sympton}
					</p>
					<ListImage
						images={images}
						alt='Ảnh triệu chứng của bệnh nhân'
					/>
				</div>

				<div className={styles.close} onClick={onClose}>
					<IoCloseOutline size={24} />
				</div>
			</div>
		</LoadingData>
	);
}

export default PopupDetailExam;
