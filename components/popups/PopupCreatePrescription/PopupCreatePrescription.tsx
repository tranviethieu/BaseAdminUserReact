import clsx from 'clsx';
import {TypePopupCreatePrescription, TypeForm} from './interfaces';
import {Fragment, useState} from 'react';
import styles from './PopupCreatePrescription.module.scss';
import ItemCreatePrescription from './ItemCreatePrescription';
import {Add} from 'iconsax-react';
import Button from '~/components/controls/Button';
import {
	toastError,
	toastSuccess,
	toastText,
	toastWarn,
} from '~/common/func/toast';
import {httpRequest} from '~/services';
import medicalRecord from '~/services/medicalRecord';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import LoadingScreen from '~/components/common/LoadingScreen';

function PopupCreatePrescription({
	uuidTicket,
	isCanInsertPrescriptions,
	onClose,
}: TypePopupCreatePrescription) {
	const router = useRouter();

	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);
	const [loading, setLoading] = useState<boolean>(false);

	// List data prescription
	const [listData, setListData] = useState<Array<TypeForm>>([
		{
			name: '',
			dosage: '',
			unit: '',
			instructions: '',
			checkValue: false,
		},
	]);

	const checkDuplicate = (arr: Array<any>) => {
		const uuidMap = new Map();
		for (const obj of arr) {
			// Convert name ==> xóa khoảng trắng trước sau, đổi thành chữ thường
			const medicineName = obj.medicineName.trim().toLowerCase();
			if (uuidMap.has(medicineName)) {
				return true; // Phát hiện name bị trùng lặp
			}
			uuidMap.set(medicineName, true);
		}
		return false;
	};

	// Xử lý thêm đơn thuốc mới
	const handleAddPrescription = () => {
		setListData([
			...listData,
			{
				name: '',
				dosage: '',
				unit: '',
				instructions: '',
				checkValue: false,
			},
		]);
	};

	// Xử lý xóa đơn thuốc
	const handleClearPrescription = (index: number) => {
		if (listData.length > 1) {
			const updateData = [...listData];
			updateData.splice(index, 1);
			setListData([...updateData]);
		} else {
			setListData([
				{
					name: '',
					dosage: '',
					unit: '',
					instructions: '',
					checkValue: false,
				},
			]);
		}
	};

	// Set lại dữ liệu cho danh sách thuốc
	const handleGroupChange = (index: number, data: TypeForm) => {
		const updateData = [...listData];
		updateData[index] = {
			name: data.name,
			dosage: data.dosage,
			unit: data.unit,
			instructions: data.instructions,
			checkValue:
				data.name !== '' ||
				data.dosage !== '' ||
				data.unit !== '' ||
				data.instructions !== '',
		};
		setListData(updateData);
	};

	// Submit form
	const handleSubmit = async () => {
		if (!isCanInsertPrescriptions) {
			return toastWarn({msg: 'Chưa đủ điều kiện tạo đơn thuốc!'});
		}

		// Kiểm tra dữ liệu không được trống
		const checkValue = listData.every(
			(v) =>
				v.name !== '' &&
				v.dosage !== '' &&
				v.unit !== '' &&
				v.instructions !== ''
		);

		if (!checkValue) {
			return toastText({
				msg: 'Vui lòng nhập đầy đủ thông tin hoặc xóa đơn thuốc không cần thiết!',
			});
		}

		// Convert value
		const values = listData
			.filter(
				(v) =>
					v.name !== '' &&
					v.dosage !== '' &&
					v.unit !== '' &&
					v.instructions !== ''
			)
			.map((v) => ({
				medicineName: v.name,
				dosage: v.dosage,
				unit: v.unit,
				note: v.instructions,
			}));

		// Kiểm tra trùng chỉ định
		if (checkDuplicate(values)) {
			return toastText({
				msg: 'Thuốc trùng nhau, vui lòng thay đổi hoặc xóa thuốc!',
			});
		}

		// Call api
		if (token) {
			const createPrescription = await httpRequest({
				setError: (err) => {
					toastError({msg: err});
				},
				http: medicalRecord.createPrescription({
					token: token!,
					uuid: uuidTicket,
					AccountUuid: accountId as string,
					medicines: values,
				}),
			});
			setLoading(false);

			if (createPrescription) {
				onClose();
				router.replace(router.asPath, undefined, {scroll: false});
				return toastSuccess({msg: 'Tạo đơn thuốc thành công!'});
			}
		}
	};

	return (
		<Fragment>
			<LoadingScreen isLoading={loading} />
			<div className={clsx('effectZoom', styles.container)}>
				<h3 className={styles.title}>Tạo đơn thuốc</h3>
				<p className={styles.des}>
					Hãy chắc chắn rằng thuốc bạn kê phù hợp với tình trạng bệnh
					của bệnh nhân.
				</p>
				<div className={styles.list}>
					{listData.map((v: any, i) => (
						<ItemCreatePrescription
							key={i}
							dataPrescription={v}
							onChange={(values: TypeForm) =>
								handleGroupChange(i, values)
							}
							checkValue={v.checkValue}
							show={i != listData.length - 1}
							clearPrescription={() => handleClearPrescription(i)}
						/>
					))}
				</div>
				<div className={styles.create} onClick={handleAddPrescription}>
					<div className={styles.icon_add}>
						<Add size={20} />
					</div>
					<p className={styles.text_create}>Tạo thêm thuốc</p>
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
							Tạo đơn thuốc
						</Button>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default PopupCreatePrescription;
