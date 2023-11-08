import ImageFill from '~/components/common/ImageFill';
import {MdOutlineFemale} from 'react-icons/md';
import Moment from 'react-moment';
import {PropsCardItem} from './interfaces';
import styles from './CardItem.module.scss';
import {GENDER} from '~/constants/mock/enum';
import {TbGenderMale} from 'react-icons/tb';
import {IoMdTransgender} from 'react-icons/io';
import Tippy from '@tippyjs/react';
import Link from 'next/link';
import {BsEye} from 'react-icons/bs';
import clsx from 'clsx';

function CardItem({data}: PropsCardItem) {
	return (
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
				<p>
					<Moment date={data.timeExam} format='HH:mm DD/MM/YYYY' />
				</p>
				<p className={styles.result}>
					<i>{data.state.name}</i>
				</p>
			</div>
			<Tippy content='Xem chi tiết' placement='top'>
				<Link
					href={`/patient-examination/detail/${data.uuid}`}
					className={styles.btnOption}
				>
					<BsEye size={16} color='#303C4F' />
				</Link>
			</Tippy>
		</div>
	);
}

export default CardItem;
