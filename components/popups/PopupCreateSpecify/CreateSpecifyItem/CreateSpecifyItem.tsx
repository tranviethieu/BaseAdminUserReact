import React, {useEffect, useState} from 'react';
import {BiSearch} from 'react-icons/bi';

import styles from './CreateSpecifyItem.module.scss';
import {ArrowDown2, Trash} from 'iconsax-react';
import TippyHeadless from '@tippyjs/react/headless';
import clsx from 'clsx';
import {TypeCreateSpecifyItem} from './interfaces';
import {httpRequest} from '~/services';
import basicService from '~/services/basicService';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {removeVietnameseTones} from '~/common/func/optionConvert';

function CreateSpecifyItem({
	specify,
	onChange,
	clearSpecify,
	checkValue,
	show,
}: TypeCreateSpecifyItem) {
	const {infoDoctor} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);

	const [keyword, setKeword] = useState<string>('');
	const [openSelect, setOpenSelect] = useState<boolean>(false);
	const [valueSelect, setValueSelect] = useState<{
		uuidDesignation: string;
		nameDesignation: string;
	}>({
		uuidDesignation: '',
		nameDesignation: '',
	});
	const [valueInput, setValueInput] = useState<string>('');
	const [listRecently, setListRecently] =
		useState<Array<{uuid: string; name: string}>>();

	// Lấy danh sách chỉ định
	useEffect(() => {
		httpRequest({
			http: basicService.getDesignationList({
				token: token!,
				HospitalUuid: infoDoctor?.hospitalUuid as string,
				keyword: '',
				limit: 0,
				page: 0,
			}),
		}).then((data) => {
			if (data) {
				setListRecently(data.items);
			}
		});
	}, [infoDoctor?.hospitalUuid, token]);

	// set lại value select
	useEffect(() => {
		setValueSelect({
			uuidDesignation: specify.uuidDesignation,
			nameDesignation: specify.nameDesignation,
		});
		setValueInput('');
	}, [specify.uuidDesignation, specify.nameDesignation]);

	// Lấy value danh sách loại chỉ định
	const handleSelectChange = (value: {uuid: string; name: string}) => {
		setValueSelect({
			uuidDesignation: value.uuid,
			nameDesignation: value.name,
		});
		// onChange({valueSelect: value, valueInput});
		onChange({
			uuidDesignation: value.uuid,
			nameDesignation: value.name,
			note: valueInput,
		});
	};

	// Lấy value input
	const handleInputChange = (event: any) => {
		setValueInput(event.target.value);
		onChange({
			uuidDesignation: valueSelect.uuidDesignation,
			nameDesignation: valueSelect.nameDesignation,
			note: event.target.value,
		});
	};

	// Xóa chỉ định
	const handleClear = () => {
		clearSpecify();
	};

	return (
		<div className={clsx(styles.container)}>
			<TippyHeadless
				maxWidth={'100%'}
				interactive
				visible={openSelect}
				onClickOutside={() => setOpenSelect(false)}
				placement='bottom'
				render={(attrs) => (
					<div className={styles.main_option}>
						<div className={styles.box_input_search}>
							<input
								type='text'
								placeholder='Nhập tên chỉ định ...'
								className={styles.input_search}
								onChange={(e) => setKeword(e.target.value)}
							/>
							<div className={styles.icon_search}>
								<BiSearch size={20} />
							</div>
						</div>

						{/* <h4 className={styles.head}>Gần đây</h4>
						<div className={styles.list_recently}>
							{listRecently?.slice(-3).map((v) => (
								<div
									key={v.id}
									className={styles.item_recently}
									onClick={() => {
										handleSelectChange(v);
										setOpenSelect(false);
									}}
								>
									{v.name}
								</div>
							))}
						</div> */}

						<h4 className={styles.head}>Danh sách</h4>
						<div className={styles.list}>
							{listRecently
								?.filter((v) =>
									removeVietnameseTones(v.name).includes(
										keyword
											? removeVietnameseTones(keyword)
											: ''
									)
								)
								?.map((v) => (
									<div
										key={v.uuid}
										className={styles.item_recently}
										onClick={() => {
											handleSelectChange(v);
											setOpenSelect(false);
										}}
									>
										{v.name}
									</div>
								))}
						</div>
					</div>
				)}
			>
				<div
					className={clsx(styles.select, {
						[styles.active]: openSelect,
					})}
					onClick={() => setOpenSelect(!openSelect)}
				>
					<p className={styles.text_select}>
						{valueSelect.nameDesignation || 'Chọn chỉ định'}
					</p>
					<div className={styles.arrow}>
						<ArrowDown2 size={18} />
					</div>
				</div>
			</TippyHeadless>
			<input
				type='text'
				placeholder='Nhập mô tả ...'
				autoComplete='off'
				onChange={handleInputChange}
				value={specify.note}
				className={styles.input}
			/>

			{(checkValue || show) && (
				<div className={styles.delete} onClick={handleClear}>
					<Trash size={20} />
				</div>
			)}
		</div>
	);
}

export default CreateSpecifyItem;
