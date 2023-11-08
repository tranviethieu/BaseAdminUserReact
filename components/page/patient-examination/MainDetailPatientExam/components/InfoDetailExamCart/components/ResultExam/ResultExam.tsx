import React, {Fragment, useState} from 'react';
import styles from './ResultExam.module.scss';
import {Edit2, Stickynote} from 'iconsax-react';
import Popup from '~/components/common/Popup';
import PopupEditResultExam from '~/components/popups/PopupEditResultExam';
import Button from '~/components/controls/Button';
import backgrounds from '~/constants/images/backgrounds';
import ImageFill from '~/components/common/ImageFill';
import ListImage from '~/components/controls/ListImage';
import PopupResultExam from '~/components/popups/PopupResultExam';
import {TypeData} from '../../interfaces';
import {STATUS_EXAM} from '~/constants/mock/enum';

function ResultExam({data}: TypeData) {
	const [openResult, setOpenResult] = useState<boolean>(false);
	const [openEditResult, setOpenEditResult] = useState<boolean>(false);

	return (
		<Fragment>
			<div className={styles.container}>
				<div className={styles.top}>
					<div className={styles.left}>
						<div className={styles.icon}>
							<Stickynote
								size={22}
								color='#04CE00'
								variant='Bold'
							/>
						</div>
						<h4 className={styles.title}>Kết quả khám</h4>
					</div>
					{data?.examResults && (
						<div
							className={styles.edit_result}
							onClick={() => setOpenEditResult(true)}
						>
							<div className={styles.icon_edit}>
								<Edit2 color='#303C4F' size={20} />
							</div>
							<p className={styles.text_edit}>Chỉnh sửa</p>
						</div>
					)}
				</div>
				{data?.examResults ? (
					<div className={styles.box_result}>
						<p className={styles.text_result}>
							{data.examResults?.result}
						</p>
						<ListImage
							images={data?.examResults?.images}
							alt='Ảnh triệu chứng của bệnh nhân'
							max={15}
						/>
					</div>
				) : (
					<div className={styles.noti_2}>
						<ImageFill
							src={backgrounds.empty_noti_2}
							className={styles.image_noti}
						/>
						<h4 className={styles.title_noti}>Chưa có kết quả</h4>
						<p className={styles.text_noti}>
							Hiện tại phiếu khám chưa có kết quả
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
							onClick={() => setOpenResult(true)}
						>
							Tạo kết quả
						</Button>
					</div>
				)}
			</div>

			{/* ===> Tạo kết luận khám */}
			<Popup open={openResult} onClose={() => setOpenResult(false)}>
				<PopupResultExam
					isCanInsertConclusion={
						data?.mrBoolean?.isCanInsertConclusion
					}
					uuidTicket={data?.medicalRecordInfo?.uuid}
					onClose={() => setOpenResult(false)}
				/>
			</Popup>

			{/* ===> Chỉnh sửa kết luận khám */}
			<Popup
				open={openEditResult}
				onClose={() => setOpenEditResult(false)}
			>
				<PopupEditResultExam
					data={data?.examResults}
					uuidConclusion={data?.examResults?.uuid}
					onClose={() => setOpenEditResult(false)}
				/>
			</Popup>
		</Fragment>
	);
}

export default ResultExam;
