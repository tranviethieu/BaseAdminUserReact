import React, {useEffect, useState} from 'react';
import styles from './FilterIndication.module.scss';
import {RiSearchLine} from 'react-icons/ri';
import {TypeFilterIndication} from './interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {updateSort} from '~/redux/reducer/sort';
import ButtonDatePicker from '~/components/controls/ButtonDatePicker';
import TippyHeadless from '@tippyjs/react/headless';
import clsx from 'clsx';
import {ArrowDown2, ClipboardExport, UserOctagon} from 'iconsax-react';
import {httpRequest} from '~/services';
import basicService from '~/services/basicService';

function FilterIndication({
	keyNameIndication,
	keyNameType,
	keyNameTime,
	keyNameKeyword,
}: TypeFilterIndication) {
	const dispatch = useDispatch();

	const {infoDoctor} = useSelector((state: RootState) => state.user);
	const {token} = useSelector((state: RootState) => state.auth);

	const [openIndication, setOpenIndication] = useState<boolean>(false);
	const [openType, setOpenType] = useState<boolean>(false);
	const [arrayIndication, setArrayIndication] = useState<Array<any>>([]);
	const [listTypeIndication, setListTypeIndication] = useState<Array<any>>(
		[]
	);

	const {[keyNameIndication]: nameIndication} = useSelector(
		(state: RootState) => state.sort
	).sort;

	const {[keyNameType]: typeIndication} = useSelector(
		(state: RootState) => state.sort
	).sort;

	const {[keyNameKeyword]: keyword} = useSelector(
		(state: RootState) => state.sort
	).sort;

	const {[keyNameTime]: time} = useSelector(
		(state: RootState) => state.sort
	).sort;

	// Lấy danh sách loại chỉ định
	useEffect(() => {
		httpRequest({
			http: basicService.getTypeDesignationList({
				token: token!,
				HospitalUuid: infoDoctor?.hospitalUuid as string,
				keyword: '',
				limit: 0,
				page: 0,
			}),
		}).then((data) => {
			if (data) {
				setListTypeIndication(data.items);
			}
		});
	}, [infoDoctor?.hospitalUuid, token]);

	// Lấy danh sách chỉ định
	useEffect(() => {
		httpRequest({
			http: basicService.getDesignationList({
				token: token!,
				HospitalUuid: infoDoctor?.hospitalUuid as string,
				keyword: '',
				limit: 0,
				page: 0,
				DesignationTypeId: typeIndication?.id,
			}),
		}).then((data) => {
			if (data) {
				setArrayIndication(data.items);
			}
		});
	}, [infoDoctor?.hospitalUuid, typeIndication?.id, token]);

	useEffect(() => {
		dispatch(
			updateSort({
				name: keyNameIndication,
				value: {
					text: '',
					uuid: '',
				},
			})
		);
	}, [dispatch, keyNameIndication, typeIndication?.id]);

	return (
		<div className={styles.container}>
			<div className={styles.list_filter}>
				{/* Loại chỉ định */}
				<TippyHeadless
					maxWidth={'100%'}
					interactive
					visible={openType}
					onClickOutside={() => setOpenType(false)}
					placement='bottom-start'
					render={(attrs) => (
						<div className={styles.list_status}>
							{listTypeIndication.map((v) => (
								<div
									key={v.id}
									className={clsx(styles.item_status, {
										[styles.active_status]:
											typeIndication?.id == v.id,
									})}
									onClick={() => {
										setOpenType(false);
										dispatch(
											updateSort({
												name: keyNameType,
												value: {
													text: v.name,
													id: v.id,
												},
											})
										);
									}}
								>
									<p className={styles.text_status}>
										{v.name}
									</p>
								</div>
							))}
						</div>
					)}
				>
					<div
						className={clsx(styles.box_item, {
							[styles.active]: openType,
						})}
						onClick={() => setOpenType(!openType)}
					>
						<div className={styles.box_icon}>
							<UserOctagon size={18} />
						</div>
						<p className={styles.text}>
							{typeIndication?.text || 'Loại chỉ định'}
						</p>

						<div
							className={clsx(styles.box_icon, {
								[styles.down]: openType,
							})}
						>
							<ArrowDown2 size={20} />
						</div>
					</div>
				</TippyHeadless>

				{/* Chỉ định */}
				<TippyHeadless
					maxWidth={'100%'}
					interactive
					visible={openIndication && arrayIndication.length > 0}
					onClickOutside={() => setOpenIndication(false)}
					placement='bottom-start'
					render={(attrs) => (
						<div className={styles.list_status}>
							{arrayIndication.map((v) => (
								<div
									key={v.uuid}
									className={clsx(styles.item_status, {
										[styles.active_status]:
											nameIndication?.uuid == v.uuid,
									})}
									onClick={() => {
										setOpenIndication(false);
										dispatch(
											updateSort({
												name: keyNameIndication,
												value: {
													text: v.name,
													uuid: v.uuid,
												},
											})
										);
									}}
								>
									<p className={styles.text_status}>
										{v.name}
									</p>
								</div>
							))}
						</div>
					)}
				>
					<div
						className={clsx(styles.box_item, {
							[styles.active]: openIndication,
						})}
						onClick={() => setOpenIndication(!openIndication)}
					>
						<div className={styles.box_icon}>
							<ClipboardExport size={16} />
						</div>
						<p className={styles.text}>
							{nameIndication?.text || 'Chỉ định'}
						</p>
						<div
							className={clsx(styles.box_icon, {
								[styles.down]: openIndication,
							})}
						>
							<ArrowDown2 size={20} />
						</div>
					</div>
				</TippyHeadless>

				<ButtonDatePicker
					keyNameTime={keyNameTime}
					value={time}
					placeholder='Thời gian'
				/>
			</div>

			<div className={styles.box_input}>
				<input
					className={styles.input}
					type='text'
					placeholder='Nhập từ khóa tìm kiếm ...'
					value={keyword}
					onChange={(e: any) =>
						dispatch(
							updateSort({
								name: keyNameKeyword,
								value: e.target.value,
							})
						)
					}
				/>
				<div className={styles.icon_search}>
					<RiSearchLine color='#7E8995' />
				</div>
			</div>
		</div>
	);
}

export default FilterIndication;
