import React, {useState} from 'react';
import {Add, TaskSquare} from 'iconsax-react';
import ItemSpecify from '../ItemSpecify';
import styles from './SpecifyVotes.module.scss';
import ImageFill from '~/components/common/ImageFill';
import backgrounds from '~/constants/images/backgrounds';
import Button from '~/components/controls/Button';
import {Fragment} from '@fullcalendar/core/preact';
import Popup from '~/components/common/Popup';
import PopupCreateSpecify from '~/components/popups/PopupCreateSpecify';
import {TypeData} from '../../interfaces';
import {STATUS_EXAM} from '~/constants/mock/enum';
import clsx from 'clsx';

function SpecifyVotes({data}: TypeData) {
	const [openSpecify, setOpenSpecify] = useState<boolean>(false);

	return (
		<Fragment>
			<div className={styles.container}>
				<div className={styles.top}>
					<div className={styles.left}>
						<div className={styles.icon}>
							<TaskSquare
								size={22}
								color='#0071CE'
								variant='Bold'
							/>
						</div>
						<h4 className={styles.title}>Phiếu chỉ định</h4>
					</div>
					{data?.medicalRecordInfo?.state?.id ==
						STATUS_EXAM.DA_KHAM ||
					data?.medicalRecordInfo?.state?.id ==
						STATUS_EXAM.DA_HUY ? null : (
						<>
							{data?.designations?.length > 0 && (
								<div
									className={clsx(styles.create_specify, {
										[styles.disable]:
											data?.medicalRecordInfo?.state
												?.id == STATUS_EXAM.CHO_KHAM,
									})}
									onClick={() => {
										if (
											data?.medicalRecordInfo?.state
												?.id == STATUS_EXAM.CHO_KHAM
										) {
											setOpenSpecify(false);
										} else {
											setOpenSpecify(true);
										}
									}}
								>
									<div className={styles.icon_add}>
										<Add color='#0071CE' size={20} />
									</div>
									<p className={styles.text_create}>Tạo</p>
								</div>
							)}
						</>
					)}
				</div>
				{data?.designations?.length > 0 ? (
					<div className={styles.main_specify}>
						{data?.designations?.map((v: any, i) => (
							<ItemSpecify key={i} data={v} />
						))}
					</div>
				) : (
					<div className={styles.noti}>
						<ImageFill
							src={backgrounds.empty_notify}
							className={styles.image_noti}
						/>
						<h4 className={styles.title_noti}>Chưa có chỉ định</h4>
						<p className={styles.text_noti}>
							Không có chỉ định cho phiếu khám này!
						</p>

						{/* Ẩn btn tạo chỉ định khi phiếu khám đã kết thúc */}
						{data?.medicalRecordInfo?.state?.id ==
							STATUS_EXAM.DA_KHAM ||
						data?.medicalRecordInfo?.state?.id ==
							STATUS_EXAM.DA_HUY ? null : (
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
								onClick={() => setOpenSpecify(true)}
							>
								Tạo chỉ định
							</Button>
						)}
					</div>
				)}
			</div>

			{/* ===> Tạo chỉ định */}
			<Popup open={openSpecify} onClose={() => setOpenSpecify(false)}>
				<PopupCreateSpecify
					isCanInsertDesignations={
						data?.mrBoolean?.isCanInsertDesignations
					}
					uuidTicket={data?.medicalRecordInfo?.uuid}
					onClose={() => setOpenSpecify(false)}
				/>
			</Popup>
		</Fragment>
	);
}

export default SpecifyVotes;
