import {Fragment, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';

import styles from './PopupUpdatePrescription.module.scss';
import clsx from 'clsx';
import {TypePopupUpdatePrescription, TypePrescription} from './interfaces';
import {httpRequest} from '~/services';
import medicine from '~/services/medicine';
import Button from '~/components/controls/Button';
import {IoMdClose} from 'react-icons/io';
import TippyHeadless from '@tippyjs/react/headless';
import {toastError, toastSuccess, toastText} from '~/common/func/toast';
import medicalRecord from '~/services/medicalRecord';
import {useRouter} from 'next/router';
import LoadingScreen from '~/components/common/LoadingScreen';

function PopupUpdatePrescription({
	dataPrescription,
	onClose,
}: TypePopupUpdatePrescription) {
	const router = useRouter();
	const {infoDoctor, accountId} = useSelector(
		(state: RootState) => state.user
	);
	const {token} = useSelector((state: RootState) => state.auth);
	const [loading, setLoading] = useState<boolean>(false);
	const [form, setForm] = useState<any>({
		medicineName: '',
		dosage: '',
		unit: '',
		note: '',
	});

	const [open, setOpen] = useState<boolean>(false);
	const [listPrescription, setListPrescription] = useState<
		Array<TypePrescription>
	>([]);

	// set form
	useEffect(() => {
		setForm({
			medicineName: dataPrescription.name,
			dosage: dataPrescription.dosage,
			unit: dataPrescription.unit,
			note: dataPrescription.note,
		});
	}, [dataPrescription]);

	// Lấy danh sách thuốc
	useEffect(() => {
		if (infoDoctor?.hospitalUuid && token) {
			httpRequest({
				http: medicine.getMedicines({
					token: token!,
					HospitalUuid: infoDoctor?.hospitalUuid,
					Type: null,
					Keyword: form.medicineName,
					Limit: null,
					Page: null,
				}),
			}).then((data) => {
				if (data) {
					setListPrescription(data.items);
				}
			});
		}
	}, [infoDoctor?.hospitalUuid, form.medicineName]);

	// submit
	const handleSubmit = async () => {
		if (!form.medicineName) {
			return toastText({msg: 'Vui lòng nhập tên thuốc!'});
		}
		if (!form.dosage) {
			return toastText({msg: 'Vui lòng nhập liều lượng!'});
		}
		if (!form.unit) {
			return toastText({msg: 'Vui lòng nhập đơn vị!'});
		}
		if (!form.note) {
			return toastText({msg: 'Vui lòng nhập cách dùng!'});
		}

		if (dataPrescription.uuid && token) {
			// Call api
			const updatePrescription = await httpRequest({
				setError: (err) => {
					toastError({msg: err});
				},
				http: medicalRecord.updatePrescription({
					token: token!,
					uuid: dataPrescription.uuid,
					AccountUuid: accountId as string,
					medicineName: form.medicineName,
					dosage: form.dosage,
					unit: form.unit,
					note: form.note,
					medicineTypeId: null,
				}),
			});
			setLoading(false);

			if (updatePrescription) {
				onClose();
				router.replace(router.asPath, undefined, {scroll: false});
				return toastSuccess({msg: 'Chỉnh sửa đơn thuốc thành công!'});
			}
		}
	};

	return (
		<Fragment>
			<LoadingScreen isLoading={loading} />
			<div className={clsx('effectZoom', styles.container)}>
				<h3 className={styles.title}>Chỉnh sửa thuốc</h3>
				<p className={styles.des}>
					Hãy chắc chắn rằng thuốc bạn kê phù hợp với tình trạng bệnh
					của bệnh nhân.
				</p>
				<TippyHeadless
					maxWidth={'100%'}
					interactive
					visible={open && listPrescription.length > 0}
					onClickOutside={() => setOpen(false)}
					placement='bottom-end'
					render={(attrs) => (
						<div className={styles.box_list_prescription}>
							<h4 className={styles.title_1}>Danh sách</h4>
							<div className={styles.list}>
								{listPrescription.map((v) => (
									<div
										key={v.uuid}
										className={styles.item}
										onClick={() => {
											setOpen(false);
											setForm((prev: any) => ({
												...prev,
												medicineName: v.name,
												dosage: '',
												unit: v.unit || '',
												note: v.instructions || '',
											}));
										}}
									>
										<div className={styles.info}>
											<p className={styles.name}>
												{v.name}
											</p>
											<p className={styles.des_info}>
												{v.instructions ||
													'Chưa cập nhật'}
											</p>
										</div>
										<i className={styles.type}>
											{v?.unit || 'Chưa cập nhật'}
										</i>
									</div>
								))}
							</div>
						</div>
					)}
				>
					<div
						className={styles.name_select}
						onClick={() => setOpen(!open)}
					>
						<p className={styles.label}>Tên thuốc:</p>
						<input
							className={styles.input_name}
							type='text'
							autoComplete='off'
							placeholder='Tìm hoặc thêm tên thuốc'
							value={form.medicineName}
							onChange={(e) =>
								setForm((prev: any) => ({
									...prev,
									medicineName: e.target.value,
								}))
							}
						/>
					</div>
				</TippyHeadless>
				<div className={styles.col_2}>
					<div className={styles.item_2}>
						<p className={styles.label}>Đơn vị:</p>
						<input
							className={styles.input_name}
							type='text'
							autoComplete='off'
							placeholder='Đơn vị'
							value={form.unit}
							onChange={(e) =>
								setForm((prev: any) => ({
									...prev,
									unit: e.target.value,
								}))
							}
						/>
					</div>
					<div className={styles.item_2}>
						<p className={styles.label}>Liều lượng:</p>
						<input
							className={styles.input_name}
							type='number'
							autoComplete='off'
							placeholder='Liều lượng'
							value={form.dosage}
							onChange={(e) =>
								setForm((prev: any) => ({
									...prev,
									dosage: e.target.value,
								}))
							}
						/>
					</div>
				</div>
				<div className={styles.item_3}>
					<p className={styles.label}>Cách dùng:</p>
					<input
						className={styles.input_name}
						type='text'
						autoComplete='off'
						placeholder='Cách dùng'
						value={form.note}
						onChange={(e) =>
							setForm((prev: any) => ({
								...prev,
								note: e.target.value,
							}))
						}
					/>
				</div>

				<div className={styles.line}></div>

				<div className={styles.btn}>
					<div className={styles.groupBtnPopup}>
						<Button grey rounded_8 bold p_8_24 onClick={onClose}>
							Hủy bỏ
						</Button>
						<Button
							primary_2
							bold
							rounded_8
							p_8_24
							onClick={handleSubmit}
						>
							Lưu thuốc
						</Button>
					</div>
				</div>

				<div onClick={onClose} className={styles.icon_close}>
					<IoMdClose size={20} />
				</div>
			</div>
		</Fragment>
	);
}

export default PopupUpdatePrescription;
