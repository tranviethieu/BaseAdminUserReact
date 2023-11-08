import React, {Fragment, useState} from 'react';
import styles from './Prescriptions.module.scss';
import {Add, EraserSquare} from 'iconsax-react';
import Popup from '~/components/common/Popup';
import PopCreatePrescription from '~/components/popups/PopupCreatePrescription';
import ImageFill from '~/components/common/ImageFill';
import backgrounds from '~/constants/images/backgrounds';
import Button from '~/components/controls/Button';
import ItemPrescription from '../ItemPrescription';
import {TypeData} from '../../interfaces';
import {STATUS_EXAM} from '~/constants/mock/enum';
import clsx from 'clsx';

function Prescriptions({data}: TypeData) {
	const [openCreatePrescription, setOpenCreatePrescription] =
		useState<boolean>(false);

	return (
		<Fragment>
			<div className={styles.container}>
				<div className={styles.top}>
					<div className={styles.left}>
						<div className={styles.icon}>
							<EraserSquare
								size={22}
								color='#B00CFE'
								variant='Bold'
							/>
						</div>
						<h4 className={styles.title}>Đơn thuốc</h4>
					</div>
					{data?.prescriptions?.length > 0 && (
						<div
							className={clsx(styles.create_prescription, {
								[styles.disable]:
									data?.medicalRecordInfo?.state?.id ==
									STATUS_EXAM.CHO_KHAM,
							})}
							onClick={() => {
								if (
									data?.medicalRecordInfo?.state?.id ==
									STATUS_EXAM.CHO_KHAM
								) {
									setOpenCreatePrescription(false);
								} else {
									setOpenCreatePrescription(true);
								}
							}}
						>
							<div className={styles.icon_add}>
								<Add color='#0071CE' size={20} />
							</div>
							<p className={styles.text_create}>Tạo</p>
						</div>
					)}
				</div>
				{data?.prescriptions?.length > 0 ? (
					<div className={styles.box_prescription}>
						{data?.prescriptions?.map((v: any, i) => (
							<ItemPrescription key={i} data={v} />
						))}
					</div>
				) : (
					<div className={styles.noti_2}>
						<ImageFill
							src={backgrounds.empty_noti_2}
							className={styles.image_noti}
						/>
						<h4 className={styles.title_noti}>Chưa có đơn thuốc</h4>
						<p className={styles.text_noti}>
							Hiện tại phiếu khám chưa có đơn thuốc
						</p>
						<Button
							primary_2_outline
							bold
							w_fit
							rounded_8
							p_4_12
							disable={
								data?.medicalRecordInfo?.state?.id ==
								STATUS_EXAM.CHO_KHAM
							}
							onClick={() => setOpenCreatePrescription(true)}
						>
							Tạo đơn thuốc
						</Button>
					</div>
				)}
			</div>
			{/* ===> Tạo đơn thuốc */}
			<Popup
				open={openCreatePrescription}
				onClose={() => setOpenCreatePrescription(false)}
			>
				<PopCreatePrescription
					uuidTicket={data?.medicalRecordInfo?.uuid}
					isCanInsertPrescriptions={
						data?.mrBoolean?.isCanInsertPrescriptions
					}
					onClose={() => setOpenCreatePrescription(false)}
				/>
			</Popup>
		</Fragment>
	);
}

export default Prescriptions;
