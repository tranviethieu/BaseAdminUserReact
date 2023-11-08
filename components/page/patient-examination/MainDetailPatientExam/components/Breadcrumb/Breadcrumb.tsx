import React, {Fragment, useState} from 'react';
import Image from 'next/image';
import styles from './Breadcrumb.module.scss';
import {ArrowRight2} from 'iconsax-react';
import {Printer, SaveAdd, Slash} from 'iconsax-react';
import {BsThreeDots} from 'react-icons/bs';
import clsx from 'clsx';
import icons from '~/constants/images/icons';
import {useRouter} from 'next/router';
import {TypeBreadcrumb} from './interfaces';
import Popup from '~/components/common/Popup';
import PopupFinishExam from '~/components/popups/PopupFinishExam';
import {STATUS_EXAM} from '~/constants/mock/enum';
import TippyHeadless from '@tippyjs/react/headless';
import PopupCancelExamCart from '~/components/popups/PopupCancelExamCart';

function Breadcrumb({
	isCanFinish,
	isCanCancel,
	ticketUuid,
	state,
	codeTicket,
	namePatient,
}: TypeBreadcrumb) {
	const router = useRouter();

	const [open, setOpen] = useState<boolean>(false);
	const [cancel, setCancel] = useState<boolean>(false);
	const [popupCancel, setPopupCancel] = useState<boolean>(false);

	return (
		<Fragment>
			<div className={styles.top}>
				<div className={styles.left}>
					<Image
						src={icons.home_icon}
						alt='icon home'
						width={20}
						height={20}
					/>
					<div className={styles.box_icon}>
						<ArrowRight2 size={16} color=' #99A2B3' />
					</div>
					<p
						className={clsx(styles.text, styles.link)}
						onClick={() => router.back()}
					>
						Phiếu khám bệnh
					</p>
					<div className={styles.box_icon}>
						<ArrowRight2 size={16} color=' #99A2B3' />
					</div>
					<p className={styles.text}>Mã phiếu {codeTicket}</p>
				</div>

				<div className={styles.right}>
					<TippyHeadless
						maxWidth={'100%'}
						interactive
						visible={cancel}
						onClickOutside={() => setCancel(false)}
						placement='bottom-start'
						render={(attrs) => (
							<div className={styles.hover}>
								{/* Trạng thái chờ khám và đang khám ==> HỦY */}
								{(state == STATUS_EXAM.CHO_KHAM ||
									state == STATUS_EXAM.DANG_KHAM) && (
									<div
										className={styles.item_hover}
										onClick={() => {
											setCancel(false);
											setPopupCancel(true);
										}}
									>
										<div className={styles.icon_hover}>
											<Slash size={18} color='#303C4F' />
										</div>
										<p className={styles.text_hover}>
											Hủy khám
										</p>
									</div>
								)}
								<div
									className={styles.item_hover}
									onClick={() => {
										setCancel(false);
									}}
								>
									<div className={styles.icon_hover}>
										<SaveAdd size={18} color='#303C4F' />
									</div>
									<p className={styles.text_hover}>
										Xuất file
									</p>
								</div>
								<div
									className={styles.item_hover}
									onClick={() => {
										setCancel(false);
									}}
								>
									<div className={styles.icon_hover}>
										<Printer size={18} color='#303C4F' />
									</div>
									<p className={styles.text_hover}>In</p>
								</div>
							</div>
						)}
					>
						<div
							className={styles.icon_dots}
							onClick={() => setCancel(!cancel)}
						>
							<BsThreeDots />
						</div>
					</TippyHeadless>
					{state == STATUS_EXAM.DANG_KHAM && (
						<div
							className={styles.end}
							onClick={() => setOpen(true)}
						>
							<p className={styles.text_end}>Kết thúc</p>
						</div>
					)}
				</div>
			</div>

			{/* Popup */}
			<Popup open={open} onClose={() => setOpen(false)}>
				<PopupFinishExam
					isCanFinish={isCanFinish}
					ticketUuid={ticketUuid}
					namePatient={namePatient}
					onClose={() => setOpen(false)}
				/>
			</Popup>

			<Popup open={popupCancel} onClose={() => setPopupCancel(false)}>
				<PopupCancelExamCart
					ticketUuid={ticketUuid}
					isCanCancel={isCanCancel}
					namePatient={namePatient}
					onClose={() => setPopupCancel(false)}
				/>
			</Popup>
		</Fragment>
	);
}

export default Breadcrumb;
