import React, {useEffect, useState} from 'react';
import styles from './ItemCreatePrescription.module.scss';
import {Trash} from 'iconsax-react';
import TippyHeadless from '@tippyjs/react/headless';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {httpRequest} from '~/services';
import medicine from '~/services/medicine';
import {TypePrescription} from '../interfaces';
import {TypeItemCreatePrescription} from './interfaces';

function ItemCreatePrescription({
	checkValue,
	show,
	dataPrescription,
	onChange,
	clearPrescription,
}: TypeItemCreatePrescription) {
	const {infoDoctor} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);

	// STATE
	const [open, setOpen] = useState<boolean>(false);
	const [listPrescription, setListPrescription] = useState<
		Array<TypePrescription>
	>([]);

	// Lấy danh sách thuốc
	useEffect(() => {
		if (infoDoctor?.hospitalUuid) {
			httpRequest({
				http: medicine.getMedicines({
					token: token!,
					HospitalUuid: infoDoctor?.hospitalUuid,
					Type: null,
					Keyword: dataPrescription.name,
					Limit: null,
					Page: null,
				}),
			}).then((data) => {
				if (data) {
					setListPrescription(data.items);
				}
			});
		}
	}, [infoDoctor?.hospitalUuid, dataPrescription.name, token]);

	// Xóa đơn thuốc
	const handleClear = () => {
		clearPrescription();
	};

	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<TippyHeadless
					maxWidth={'100%'}
					interactive
					visible={open && listPrescription.length > 0}
					onClickOutside={() => setOpen(false)}
					placement='bottom-end'
					render={(attrs) => (
						<div className={styles.box_list_prescription}>
							<h4 className={styles.title}>Danh sách</h4>
							<div className={styles.list}>
								{listPrescription.map((v) => (
									<div
										key={v.uuid}
										className={styles.item}
										onClick={() => {
											setOpen(false);
											onChange({
												name: v.name,
												dosage: '',
												unit: v.unit || '',
												instructions:
													v.instructions || '',
											});
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
						<input
							className={styles.input_name}
							type='text'
							autoComplete='off'
							placeholder='Tìm hoặc thêm tên thuốc'
							value={dataPrescription.name}
							onChange={(e) =>
								onChange({
									name: e.target.value,
									dosage: dataPrescription.dosage,
									unit: dataPrescription.unit,
									instructions: dataPrescription.instructions,
								})
							}
						/>
					</div>
				</TippyHeadless>
				<input
					className={styles.input_dosage}
					type='number'
					autoComplete='off'
					placeholder='Liều lượng'
					value={dataPrescription.dosage}
					onChange={(e) =>
						onChange({
							name: dataPrescription.name,
							dosage: e.target.value,
							unit: dataPrescription.unit,
							instructions: dataPrescription.instructions,
						})
					}
				/>
				<input
					className={styles.input_dosage}
					type='text'
					autoComplete='off'
					placeholder='Đơn vị'
					value={dataPrescription.unit}
					onChange={(e) =>
						onChange({
							name: dataPrescription.name,
							dosage: dataPrescription.dosage,
							unit: e.target.value,
							instructions: dataPrescription.instructions,
						})
					}
				/>
			</div>
			<div className={styles.bottom}>
				<input
					className={styles.input_note}
					type='text'
					autoComplete='off'
					placeholder='Cách dùng'
					value={dataPrescription.instructions}
					onChange={(e) =>
						onChange({
							name: dataPrescription.name,
							dosage: dataPrescription.dosage,
							unit: dataPrescription.unit,
							instructions: e.target.value,
						})
					}
				/>
				{(checkValue || show) && (
					<div className={styles.delete} onClick={handleClear}>
						<Trash size={20} />
					</div>
				)}
			</div>
		</div>
	);
}

export default ItemCreatePrescription;
