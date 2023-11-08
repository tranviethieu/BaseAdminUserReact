import {Cake, Call} from 'iconsax-react';

import CheckTypeExam from '~/components/common/CheckTypeExam/CheckTypeExam';
import CheckTypeStatus from '~/components/common/CheckTypeStatus/CheckTypeStatus';
import {Fragment} from 'react';
import ImageFill from '~/components/common/ImageFill';
import ListImage from '~/components/controls/ListImage';
import {MdOutlineFemale} from 'react-icons/md';
import WrapperDetail from '../WrapperDetail';
import styles from './InformationExamCart.module.scss';
import {TypeData} from './interfaces';
import convertDate from '~/common/func/convertDate';
import {GENDER, TYPE_EXAM} from '~/constants/mock/enum';
import {IoMdTransgender} from 'react-icons/io';
import {TbGenderMale} from 'react-icons/tb';
import clsx from 'clsx';

function InformationExamCart({data}: TypeData) {
	return (
		<Fragment>
			<div className={styles.wrapper}>
				{/* Thông tin phiếu */}
				<WrapperDetail title='Thông tin phiếu'>
					<div className={styles.container}>
						<div className={styles.item}>
							<p className={styles.text_1}>Mã phiếu:</p>
							<p className={styles.text_2}>
								{data?.medicalRecordInfo?.code}
							</p>
						</div>

						{/* <div className={styles.item}>
							<p className={styles.text_1}>Ngày khám:</p>
							<p className={styles.text_2}>
								{convertDate(
									data?.medicalRecordInfo?.timeExam
								).getDateFormat()}
							</p>
						</div> */}

						{data?.medicalRecordInfo?.addressType?.id ==
							TYPE_EXAM.TAI_NHA && (
							<div className={styles.item}>
								<p className={styles.text_1}>Địa chỉ khám:</p>
								<p className={styles.text_2}>
									{data?.patientInfo?.specificAddress &&
										`${data?.patientInfo?.specificAddress},`}{' '}
									{data?.patientInfo?.ward?.name},{' '}
									{data?.patientInfo?.district?.name},{' '}
									{data?.patientInfo?.province?.name}
								</p>
							</div>
						)}
						{/* <div className={styles.item}>
							<p className={styles.text_1}>Ngày đến khám:</p>
							<p className={styles.text_2}>
								{convertDate(
									data?.medicalRecordInfo?.timeExam
								).getFullDateTime()}
							</p>
						</div> */}
						<div className={styles.item}>
							<p className={styles.text_1}>Thời gian tạo:</p>
							<p className={styles.text_2}>
								{convertDate(
									data?.medicalRecordInfo?.timeCreated
								).getFullDateTime()}
							</p>
						</div>
						{/* Thời gian khám */}
						<div className={styles.item}>
							<p className={styles.text_1}>Thời gian khám:</p>
							<p className={styles.text_2}>
								{convertDate(
									data?.medicalRecordInfo?.timeExam
								).getFullDateTime()}
							</p>
						</div>
						<div className={styles.item}>
							<p className={styles.text_1}>Cập nhật cuối:</p>
							<p className={styles.text_2}>
								{convertDate(
									data?.medicalRecordInfo?.timeLastUpdated
								).getFullDateTime()}
							</p>
						</div>
						{data?.medicalRecordInfo?.note && (
							<div className={styles.item}>
								<p className={styles.text_1}>Lý do từ chối:</p>
								<p className={styles.text_2}>
									{data?.medicalRecordInfo?.note}
								</p>
							</div>
						)}

						{/* Trạng thái phiếu khám */}
						<div className={styles.status}>
							<CheckTypeStatus
								type={Number(
									data?.medicalRecordInfo?.state?.id
								)}
							/>
						</div>
					</div>
				</WrapperDetail>

				{/* Dịch vụ */}
				<WrapperDetail title='Dịch vụ'>
					<div className={styles.container}>
						<div className={styles.item}>
							<p className={styles.text_1}>Hình thức khám:</p>
							<CheckTypeExam
								type={Number(
									data?.medicalRecordInfo?.addressType?.id
								)}
							/>
						</div>
						{/* <div className={styles.item}>
							<p className={styles.text_1}>Cở sở y tế:</p>
							<p className={styles.text_2}>Bệnh viện Bạch Mai</p>
						</div> */}

						{data?.medicalRecordInfo?.specialist?.name && (
							<div className={styles.item}>
								<p className={styles.text_1}>Chuyên khoa:</p>
								<p className={styles.text_2}>
									{data?.medicalRecordInfo?.specialist?.name}
								</p>
							</div>
						)}
						{data?.medicalRecordInfo?.service?.name && (
							<div className={styles.item}>
								<p className={styles.text_1}>Gói dịch vụ:</p>
								<p className={styles.text_2}>
									{data?.medicalRecordInfo?.service?.name ||
										'Chưa cập nhật'}
								</p>
							</div>
						)}
					</div>
				</WrapperDetail>

				{/* Bệnh nhân */}
				<WrapperDetail title='Bệnh nhân'>
					<div className={styles.user_info}>
						<div className={styles.avatar}>
							<ImageFill
								src={`${process.env.NEXT_PUBLIC_URL_FILE}/${data?.patientInfo?.image}`}
								style_1_1
								className={styles.image}
							/>
							<div
								className={clsx(styles.gender, {
									[styles.male]:
										data?.patientInfo?.gender?.id ==
										GENDER.NAM,
								})}
							>
								<div className={styles.icon_female}>
									{data?.patientInfo?.gender?.id ==
									GENDER.NAM ? (
										<TbGenderMale size={12} color='#fff' />
									) : data?.patientInfo?.gender?.id ==
									  GENDER.NU ? (
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
								{data?.patientInfo?.fullName}
							</h4>
							<div className={styles.des_item}>
								<div className={styles.icon_des}>
									<Cake size={16} variant='Bold' />
								</div>
								<p className={styles.text_des}>
									{convertDate(
										data?.patientInfo?.dateOfBirth
									).getDateFormat()}
								</p>
							</div>
							<div className={styles.des_item}>
								<div className={styles.icon_des}>
									<Call size={16} variant='Bold' />
								</div>
								<p className={styles.text_des}>
									{data?.patientInfo?.phone}
								</p>
							</div>
						</div>
					</div>
				</WrapperDetail>

				{/* Triệu chứng */}
				<WrapperDetail title='Triệu chứng'>
					<p className={styles.text_symptom}>
						{data?.patientInfo?.sympton ||
							'Chưa cập nhật triệu chứng của bệnh nhân này!'}
					</p>
					<ListImage
						images={data?.patientInfo?.symptonImages}
						alt='Ảnh triệu chứng của bệnh nhân'
					/>
				</WrapperDetail>
			</div>
		</Fragment>
	);
}

export default InformationExamCart;
