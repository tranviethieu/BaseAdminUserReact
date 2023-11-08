import React, {useState} from 'react';

import styles from './BasicStats.module.scss';
import {Edit2, ShieldTick} from 'iconsax-react';
import {IoBody} from 'react-icons/io5';
import {GiHeartOrgan, GiWeightScale} from 'react-icons/gi';
import {WiThermometer} from 'react-icons/wi';
import {BsFillLungsFill, BsHeartPulseFill} from 'react-icons/bs';
import {TypeData} from '../../interfaces';
import {Fragment} from 'react';
import Popup from '~/components/common/Popup';
import PopupEditBasicStats from '~/components/popups/PopupEditBasicStats';

function BasicStats({data}: TypeData) {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<Fragment>
			<div className={styles.container}>
				<div className={styles.top}>
					<div className={styles.left}>
						<div className={styles.icon}>
							<ShieldTick
								size={22}
								color='#FF535A'
								variant='Bold'
							/>
						</div>
						<h4 className={styles.title}>Chỉ số cơ bản</h4>
					</div>
					<div
						className={styles.edit_result}
						onClick={() => setOpen(true)}
					>
						<div className={styles.icon_edit}>
							<Edit2 color='#0071CE' size={20} />
						</div>
						<p className={styles.text_edit}>Cập nhật</p>
					</div>
				</div>
				<div className={styles.main}>
					<div
						className={styles.item}
						style={{backgroundColor: 'rgba(71, 122, 253, 0.05)'}}
					>
						<div
							className={styles.icon_main}
							style={{
								backgroundColor: 'rgba(71, 122, 253, 0.05)',
								borderColor: 'rgba(71, 122, 253, 0.2)',
							}}
						>
							<IoBody color='#477AFD' size={16} />
						</div>
						<p className={styles.text}>Chiều cao(cm)</p>
						<p className={styles.value}>
							{data?.basicIndex?.height || '--'}
						</p>
					</div>

					<div
						className={styles.item}
						style={{
							backgroundColor: ' rgba(0, 216, 164, 0.05)',
						}}
					>
						<div
							className={styles.icon_main}
							style={{
								backgroundColor: ' rgba(0, 216, 164, 0.05)',
								borderColor: 'rgba(0, 216, 164, 0.2)',
							}}
						>
							<GiWeightScale color='#00D8A4' size={16} />
						</div>
						<p className={styles.text}>Cân nặng(kg)</p>
						<p className={styles.value}>
							{data?.basicIndex?.weight || '--'}
						</p>
					</div>

					<div
						className={styles.item}
						style={{backgroundColor: 'rgba(241, 150, 84, 0.05)'}}
					>
						<div
							className={styles.icon_main}
							style={{
								backgroundColor: 'rgba(241, 150, 84, 0.05)',
								borderColor: 'rgba(241, 150, 84, 0.2)',
							}}
						>
							<WiThermometer color='#F19654' size={16} />
						</div>
						<p className={styles.text}>Nhiệt độ(oC)</p>
						<p className={styles.value}>
							{data?.basicIndex?.temperature || '--'}
						</p>
					</div>

					<div
						className={styles.item}
						style={{backgroundColor: 'rgba(241, 84, 84, 0.05)'}}
					>
						<div
							className={styles.icon_main}
							style={{
								backgroundColor: 'rgba(241, 84, 84, 0.05)',
								borderColor: 'rgba(241, 84, 84, 0.2)',
							}}
						>
							<BsHeartPulseFill color='#F15454' size={16} />
						</div>
						<p className={styles.text}>Nhịp tim(/phút)</p>
						<p className={styles.value}>
							{data?.basicIndex?.heartRate || '--'}
						</p>
					</div>

					<div
						className={styles.item}
						style={{backgroundColor: 'rgba(123, 143, 167, 0.05)'}}
					>
						<div
							className={styles.icon_main}
							style={{
								backgroundColor: 'rgba(123, 143, 167, 0.05)',
								borderColor: 'rgba(123, 143, 167, 0.2)',
							}}
						>
							<BsFillLungsFill color='#7B8FA7' size={16} />
						</div>
						<p className={styles.text}>Nhịp thở(/phút)</p>
						<p className={styles.value}>
							{data?.basicIndex?.breathingRate || '--'}
						</p>
					</div>

					<div
						className={styles.item}
						style={{backgroundColor: 'rgba(0, 173, 227, 0.05)'}}
					>
						<div
							className={styles.icon_main}
							style={{
								backgroundColor: 'rgba(0, 173, 227, 0.05)',
								borderColor: 'rgba(0, 173, 227, 0.2)',
							}}
						>
							<GiHeartOrgan color='#00ADE3' size={16} />
						</div>
						<p className={styles.text}>Huyết áp(mmHg)</p>
						<p className={styles.value}>
							{data?.basicIndex?.bloodPressure || '--'}
						</p>
					</div>
				</div>
			</div>
			<Popup open={open} onClose={() => setOpen(false)}>
				<PopupEditBasicStats
					uuidTicket={data?.medicalRecordInfo?.uuid}
					isCanInsertBasicIndex={
						data?.mrBoolean?.isCanInsertBasicIndex
					}
					onClose={() => setOpen(false)}
					data={data.basicIndex}
				/>
			</Popup>
		</Fragment>
	);
}

export default BasicStats;
