import React, {Fragment, useEffect, useState} from 'react';

import styles from './PopupEditBasicStats.module.scss';
import {TypeForm, TypePopupEditBasicStats} from './interfaces';
import Form, {Input} from '~/components/controls/Form';
import Button from '~/components/controls/Button';
import {IoMdClose} from 'react-icons/io';
import {toastError, toastSuccess, toastWarn} from '~/common/func/toast';
import {httpRequest} from '~/services';
import medicalRecord from '~/services/medicalRecord';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import LoadingScreen from '~/components/common/LoadingScreen';

function PopupEditBasicStats({
	uuidTicket,
	isCanInsertBasicIndex,
	onClose,
	data,
}: TypePopupEditBasicStats) {
	const router = useRouter();

	const {token} = useSelector((state: RootState) => state.auth);
	const {accountId} = useSelector((state: RootState) => state.user);

	const [loading, setLoading] = useState<boolean>(false);

	const [form, setForm] = useState<TypeForm>({
		height: null,
		weight: null,
		heartRate: null,
		temperature: null,
		breathingRate: null,
		bloodPressure: null,
	});

	useEffect(() => {
		if (data) {
			setForm((prev: any) => {
				return {
					...prev,
					height: data.height,
					weight: data.weight,
					heartRate: data.heartRate,
					temperature: data.temperature,
					bloodPressure: data.bloodPressure,
					breathingRate: data.breathingRate,
				};
			});
		}
	}, [data]);

	const handleSubmit = async () => {
		if (!isCanInsertBasicIndex) {
			toastWarn({msg: 'Chưa đủ điều kiện chỉnh sửa chỉ số cơ bản!'});
			return;
		}

		if (uuidTicket && token) {
			// Call api
			const editBasicIndex = await httpRequest({
				setError: (err) => {
					toastError({msg: err});
				},
				http: medicalRecord.editBasicIndex({
					token: token!,
					AccountUuid: accountId as string,
					uuid: uuidTicket,
					height: Number(form.height),
					weight: Number(form.weight),
					bloodPressure: Number(form.bloodPressure),
					breathingRate: Number(form.breathingRate),
					heartRate: Number(form.heartRate),
					temperature: Number(form.temperature),
				}),
			});
			setLoading(false);

			if (editBasicIndex) {
				onClose();
				router.replace(router.asPath, undefined, {scroll: false});
				return toastSuccess({
					msg: 'Cập nhật chỉ số cơ bản thành công!',
				});
			}
		}
	};

	return (
		<Fragment>
			<LoadingScreen isLoading={loading} />
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				<div className={styles.container}>
					<h4 className={styles.title}>Cập nhật chỉ số sức khỏe</h4>
					<div className={styles.col_2}>
						<div className={styles.item}>
							<p className={styles.label}>Chiều cao(cm)</p>
							<Input
								type='number'
								rounded_8
								bgGrey
								rounde
								placeholder='170 cm'
								name='height'
								value={form?.height}
								textRequired='Vui lòng nhập chiều cao'
							/>
						</div>
						<div className={styles.item}>
							<p className={styles.label}>Cân nặng (kg)</p>
							<Input
								type='number'
								rounded_8
								bgGrey
								rounde
								placeholder='70 kg'
								name='weight'
								value={form?.weight}
								textRequired='Vui lòng nhập cân nặng'
							/>
						</div>
					</div>

					<div className={styles.col_2}>
						<div className={styles.item}>
							<p className={styles.label}>Nhiệt độ(oC) </p>
							<Input
								type='number'
								rounded_8
								bgGrey
								rounde
								placeholder='36.5 oC'
								name='temperature'
								value={form?.temperature}
								textRequired='Vui lòng nhập nhiệt độ'
							/>
						</div>
						<div className={styles.item}>
							<p className={styles.label}>Nhịp tim(/phút)</p>
							<Input
								type='number'
								rounded_8
								bgGrey
								rounde
								placeholder='60-80 lần/phút'
								name='heartRate'
								value={form?.heartRate}
								textRequired='Vui lòng nhập nhịp tim'
							/>
						</div>
					</div>

					<div className={styles.col_2}>
						<div className={styles.item}>
							<p className={styles.label}>Nhịp thở(/phút)</p>
							<Input
								type='number'
								rounded_8
								bgGrey
								rounde
								placeholder='60 lần/phút'
								name='breathingRate'
								value={form?.breathingRate}
								textRequired='Vui lòng nhập nhịp thở'
							/>
						</div>
						<div className={styles.item}>
							<p className={styles.label}>Huyết áp(mmHg)</p>
							<Input
								type='number'
								rounded_8
								bgGrey
								rounde
								placeholder='110mmHg/70mmHg'
								name='bloodPressure'
								value={form?.bloodPressure}
								textRequired='Vui lòng nhập huyết áp'
							/>
						</div>
					</div>
					<div className={styles.line}></div>

					<div className={styles.btn}>
						<div className={styles.groupBtnPopup}>
							<Button
								grey
								rounded_8
								bold
								p_8_24
								onClick={onClose}
							>
								Hủy bỏ
							</Button>
							<Button primary_2 bold rounded_8 p_8_24>
								Cập nhật
							</Button>
						</div>
					</div>

					<div onClick={onClose} className={styles.icon_close}>
						<IoMdClose size={20} />
					</div>
				</div>
			</Form>
		</Fragment>
	);
}

export default PopupEditBasicStats;
