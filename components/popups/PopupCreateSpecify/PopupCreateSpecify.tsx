import clsx from 'clsx';
import {TypePopupCreateSpecify, TypeSpecify, TypeValue} from './interfaces';
import styles from './PopupCreateSpecify.module.scss';
import {IoMdClose} from 'react-icons/io';
import Button from '~/components/controls/Button';
import {
	toastError,
	toastSuccess,
	toastText,
	toastWarn,
} from '~/common/func/toast';
import {Add} from 'iconsax-react';
import CreateSpecifyItem from './CreateSpecifyItem';
import {Fragment, useState} from 'react';
import {httpRequest} from '~/services';
import medicalRecord from '~/services/medicalRecord';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {useRouter} from 'next/router';
import LoadingScreen from '~/components/common/LoadingScreen';

function PopupCreateSpecify({
	isCanInsertDesignations,
	uuidTicket,
	onClose,
}: TypePopupCreateSpecify) {
	const router = useRouter();
	const {accountId} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);

	const [loading, setLoading] = useState<boolean>(false);
	const [listSpecify, setListSpecify] = useState<Array<TypeSpecify>>([
		{uuidDesignation: '', nameDesignation: '', note: '', checkValue: false},
	]);

	// Thêm phiếu chỉ định mới
	const handleAddSpecify = () => {
		setListSpecify([
			...listSpecify,
			{
				uuidDesignation: '',
				nameDesignation: '',
				note: '',
				checkValue: false,
			},
		]);
	};

	// Set lại dữ liệu cho danh sách chỉ định
	const handleGroupChange = (
		index: number,
		{uuidDesignation, nameDesignation, note}: TypeValue
	) => {
		const updatedSpecify = [...listSpecify];
		updatedSpecify[index] = {
			uuidDesignation: uuidDesignation,
			nameDesignation: nameDesignation,
			note: note,
			checkValue: uuidDesignation !== '' || note !== '',
		};
		setListSpecify(updatedSpecify);
	};

	// Xóa chỉ định
	const handleClearSpecify = (index: number) => {
		if (listSpecify.length > 1) {
			const updatedSpecify = [...listSpecify];
			updatedSpecify.splice(index, 1);
			setListSpecify([...updatedSpecify]);
		} else {
			setListSpecify([
				{
					uuidDesignation: '',
					nameDesignation: '',
					note: '',
					checkValue: false,
				},
			]);
		}
	};

	// Hàm kiểm tra trùng chỉ định ==> trả về true là trùng, false là không trùng
	const checkDuplicate = (
		arr: Array<{
			uuid: string;
			name: string;
			note: string;
		}>
	) => {
		const uuidMap = new Map();
		for (const obj of arr) {
			const uuid = obj.uuid;
			if (uuidMap.has(uuid)) {
				return true; // Phát hiện uuid bị trùng lặp
			}
			uuidMap.set(uuid, true);
		}
		return false;
	};

	// Submit form
	const handleSubmit = async () => {
		// Kiểm tra điều kiện data trả về
		if (!isCanInsertDesignations) {
			return toastWarn({msg: 'Chưa đủ điều kiện tạo chỉ định!'});
		}

		// Kiểm tra dữ liệu không được trống
		const checkValue = listSpecify.every(
			(specify) => specify.uuidDesignation !== '' && specify.note !== ''
		);

		if (!checkValue) {
			return toastText({
				msg: 'Vui lòng nhập đầy đủ thông tin hoặc xóa chỉ định không cần thiết!',
			});
		}

		// Lấy value submit
		const values = listSpecify
			.filter(
				(specify) =>
					specify.uuidDesignation !== '' && specify.note !== ''
			)
			.map((specify) => ({
				uuid: specify.uuidDesignation,
				name: specify.nameDesignation,
				note: specify.note,
			}));

		// Kiểm tra trùng chỉ định
		if (checkDuplicate(values)) {
			return toastText({
				msg: 'Chỉ định trùng nhau, vui lòng thay đổi hoặc xóa chỉ định!',
			});
		}

		if (token) {
			setLoading(true);

			// Call api
			const createDesignation = await httpRequest({
				setError: (err) => {
					toastError({msg: err});
				},
				http: medicalRecord.createDesignation({
					token: token!,
					uuid: uuidTicket,
					AccountUuid: accountId as string,
					array: values,
				}),
			});

			setLoading(false);

			if (createDesignation) {
				onClose();
				router.replace(router.asPath, undefined, {scroll: false});
				return toastSuccess({msg: 'Tạo chỉ định khám thành công!'});
			}
		}
	};
	return (
		<Fragment>
			<LoadingScreen isLoading={loading} />
			<div className={clsx('effectZoom', styles.container)}>
				<h3 className={styles.title}>Tạo phiếu chỉ định</h3>
				<p className={styles.des}>
					Bạn có thể tạo 1 hoặc nhiều chỉ định đối với một bệnh nhân.
				</p>

				<div className={styles.list}>
					{listSpecify.map((specify, index) => (
						<CreateSpecifyItem
							key={index}
							specify={specify}
							onChange={(values: TypeValue) =>
								handleGroupChange(index, values)
							}
							clearSpecify={() => handleClearSpecify(index)}
							checkValue={specify.checkValue}
							show={index != listSpecify.length - 1}
						/>
					))}
				</div>

				<div className={styles.create} onClick={handleAddSpecify}>
					<div className={styles.icon_add}>
						<Add size={20} />
					</div>
					<p className={styles.text_create}>Tạo thêm chỉ định</p>
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
							Lưu chỉ định
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

export default PopupCreateSpecify;
