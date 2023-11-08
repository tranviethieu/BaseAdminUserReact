import ImageFill from '~/components/common/ImageFill';
import {MdOutlineFemale} from 'react-icons/md';
import Moment from 'react-moment';
import {PropsCardItem} from './interfaces';
import styles from './CardItem.module.scss';
import {GENDER, STATUS_EXAM, TYPE_EXAM} from '~/constants/mock/enum';
import {TbGenderMale} from 'react-icons/tb';
import {IoMdTransgender} from 'react-icons/io';
import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import {BsCheck2, BsEye} from 'react-icons/bs';
import {Stickynote} from 'iconsax-react';
import {IoCloseSharp} from 'react-icons/io5';
import {useRouter} from 'next/router';
import {Fragment, useState} from 'react';
import Popup from '~/components/common/Popup';
import PopupCancelExam from '~/components/popups/PopupCancelExam';
import PopupConfirmExam from '~/components/popups/PopupConfirmExam';
import PopupBrowseExam from '~/components/popups/PopupBrowseExam';
import CheckTypeExam from '~/components/common/CheckTypeExam';
import CheckTypeStatus from '~/components/common/CheckTypeStatus/CheckTypeStatus';

function CardItem({data}: PropsCardItem) {
	const router = useRouter();

	const [ticketUuid, setTicketUuid] = useState<string>('');
	const [namePatient, setNamePatient] = useState<string>('');

	// Popup
	const [openBrowse, setOpenBrowse] = useState<boolean>(false);
	const [openConfirm, setOpenConfirm] = useState<boolean>(false);
	const [openCancel, setOpenCancel] = useState<boolean>(false);

	const handleNextlink = (ticketUuid: string, state: number | null) => {
		if (state == STATUS_EXAM.DA_XAC_NHAN || state == STATUS_EXAM.DA_DUYET) {
			router.push(`/appointment-schedule?uuid=${ticketUuid}`);
		}
		if (
			state == STATUS_EXAM.CHO_KHAM ||
			state == STATUS_EXAM.DEN_LUOT_KHAM ||
			state == STATUS_EXAM.DANG_KHAM
		) {
			router.push(
				`/appointment-schedule?_status=happenning&uuid=${ticketUuid}`
			);
		}

		if (
			state == STATUS_EXAM.DA_KHAM ||
			state == STATUS_EXAM.TU_CHOI ||
			state == STATUS_EXAM.DA_HUY
		) {
			router.push(`/appointment-schedule?_status=end&uuid=${ticketUuid}`);
		}
	};

	return (
		<Fragment>
			<div className={styles.container}>
				<div className={styles.avatar}>
					<ImageFill
						src={`${process.env.NEXT_PUBLIC_URL_FILE}/${data.image}`}
						style_1_1
						className={styles.image}
					/>
					<div
						className={clsx(styles.gender, {
							[styles.male]: data?.gender?.id == GENDER.NAM,
						})}
					>
						<div className={styles.icon_female}>
							{data?.gender?.id == GENDER.NAM ? (
								<TbGenderMale size={12} color='#fff' />
							) : data?.gender?.id == GENDER.NU ? (
								<MdOutlineFemale size={12} color='#fff' />
							) : (
								<IoMdTransgender size={12} color='#fff' />
							)}
						</div>
					</div>
				</div>
				<div className={styles.infoUser}>
					<p className={styles.name}>{data.patientName}</p>
					<p className={styles.phone}>
						<i>{data.phone}</i>
					</p>
				</div>
				<div className={styles.infoCalendar}>
					<div>
						<p>
							<Moment
								date={data.timeExam}
								format='HH:mm DD/MM/YYYY'
							/>
						</p>
					</div>
					<p className={styles.result}>
						<i>{data.sympton || 'Chưa cập nhật'}</i>
					</p>
				</div>

				<div className={styles.state}>
					<CheckTypeStatus type={data?.state?.id} />
				</div>

				<div className={styles.control}>
					{/* Duyệt lịch khám */}
					{data.state.id == STATUS_EXAM.DA_XAC_NHAN && (
						<Tippy content='Duyệt lịch khám' placement='top'>
							<div
								className={clsx(styles.item, styles.browse)}
								onClick={() => {
									setOpenBrowse(true);
									setTicketUuid(data.uuid);
									setNamePatient(data.patientName);
								}}
							>
								<BsCheck2 size={16} color='#4CD28A' />
							</div>
						</Tippy>
					)}

					{/* Xác nhận khám */}
					{data.state.id == STATUS_EXAM.DA_DUYET &&
						(data.addressType.id == TYPE_EXAM.TAI_NHA ||
							data.addressType.id == TYPE_EXAM.TRUC_TUYEN) && (
							<Tippy content='Xác nhận khám' placement='top'>
								<div
									className={clsx(styles.item, styles.browse)}
									onClick={() => {
										setOpenConfirm(true);
										setTicketUuid(data.uuid);
										setNamePatient(data.patientName);
									}}
								>
									<Stickynote size={16} color='#4CD28A' />
								</div>
							</Tippy>
						)}

					{/* Từ chối khám bệnh */}
					{data.state.id != STATUS_EXAM.DA_DUYET && (
						<Tippy content='Từ chối khám bệnh' placement='top'>
							<div
								className={clsx(styles.item, styles.cancel)}
								onClick={() => {
									setOpenCancel(true);
									setTicketUuid(data.uuid);
									setNamePatient(data.patientName);
								}}
							>
								<IoCloseSharp size={16} color='#FF6A55' />
							</div>
						</Tippy>
					)}

					<Tippy content='Xem chi tiết' placement='top'>
						<div
							className={clsx(styles.item, styles.detail)}
							onClick={() =>
								handleNextlink(data.uuid, data.state.id)
							}
						>
							<BsEye size={16} color='#303C4F' />
						</div>
					</Tippy>
				</div>
			</div>

			{/* Popup */}
			<Popup open={openBrowse} onClose={() => setOpenBrowse(false)}>
				<PopupBrowseExam
					ticketUuid={ticketUuid}
					namePatient={namePatient}
					onClose={() => setOpenBrowse(false)}
				/>
			</Popup>

			<Popup open={openConfirm} onClose={() => setOpenConfirm(false)}>
				<PopupConfirmExam
					ticketUuid={ticketUuid}
					namePatient={namePatient}
					onClose={() => setOpenConfirm(false)}
				/>
			</Popup>

			<Popup open={openCancel} onClose={() => setOpenCancel(false)}>
				<PopupCancelExam
					ticketUuid={ticketUuid}
					namePatient={namePatient}
					onClose={() => setOpenCancel(false)}
				/>
			</Popup>
		</Fragment>
	);
}

export default CardItem;
