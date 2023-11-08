import React, {Fragment, useState} from 'react';
import styles from './BoxFilter.module.scss';
import {ArrowDown2, CalendarSearch, Refresh2, UserOctagon} from 'iconsax-react';
import clsx from 'clsx';
import {RiSearchLine} from 'react-icons/ri';
import {TypeFilter} from './interfaces';
import TippyHeadless from '@tippyjs/react/headless';
import {listExam} from '~/constants/mock/data';
import ButtonDateRanger from '../ButtonDateRanger';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {updateSort} from '~/redux/reducer/sort';

function BoxFilter({
	isStatus,
	keyNameStatus,
	keyNameExam,
	keyNameTime,
	keyNameKeyword,
	arrayStatus,
}: TypeFilter) {
	const dispatch = useDispatch();

	const [openExam, setOpenExam] = useState<boolean>(false);
	const [openStatus, setOpenStatus] = useState<boolean>(false);

	const {[keyNameStatus]: textStatus} = useSelector(
		(state: RootState) => state.sort
	).sort;

	const {[keyNameExam]: textExam} = useSelector(
		(state: RootState) => state.sort
	).sort;

	const {[keyNameKeyword]: keyword} = useSelector(
		(state: RootState) => state.sort
	).sort;

	return (
		<div className={styles.container}>
			<div className={styles.list_filter}>
				{isStatus && (
					<Fragment>
						{/* Trạng thái */}
						<TippyHeadless
							maxWidth={'100%'}
							interactive
							visible={openStatus}
							onClickOutside={() => setOpenStatus(false)}
							placement='bottom-start'
							render={(attrs) => (
								<div className={styles.list_status}>
									{arrayStatus.map((v) => (
										<div
											key={v.value}
											className={clsx(
												styles.item_status,
												{
													[styles.active_status]:
														textStatus?.id ==
														v.value,
												}
											)}
											onClick={() => {
												setOpenStatus(false);
												dispatch(
													updateSort({
														name: keyNameStatus,
														value: {
															text: v.title,
															id: v.value,
														},
													})
												);
											}}
										>
											<p className={styles.text_status}>
												{v.title}
											</p>
										</div>
									))}
								</div>
							)}
						>
							<div
								className={clsx(styles.box_item, {
									[styles.active]: openStatus,
								})}
								onClick={() => setOpenStatus(!openStatus)}
							>
								<div className={styles.box_icon}>
									<Refresh2 size={16} />
								</div>
								<p className={styles.text}>
									{textStatus?.text || 'Trạng thái'}
								</p>
								<div
									className={clsx(styles.box_icon, {
										[styles.down]: openStatus,
									})}
								>
									<ArrowDown2 size={20} />
								</div>
							</div>
						</TippyHeadless>
					</Fragment>
				)}

				{/* Hình thức khám */}
				<TippyHeadless
					maxWidth={'100%'}
					interactive
					visible={openExam}
					onClickOutside={() => setOpenExam(false)}
					placement='bottom-start'
					render={(attrs) => (
						<div className={styles.list_status}>
							{listExam.map((v) => (
								<div
									key={v.value}
									className={clsx(styles.item_status, {
										[styles.active_status]:
											textExam?.id == v.value,
									})}
									onClick={() => {
										setOpenExam(false);
										dispatch(
											updateSort({
												name: keyNameExam,
												value: {
													text: v.title,
													id: v.value,
												},
											})
										);
									}}
								>
									<p className={styles.text_status}>
										{v.title}
									</p>
								</div>
							))}
						</div>
					)}
				>
					<div
						className={clsx(styles.box_item, {
							[styles.active]: openExam,
						})}
						onClick={() => setOpenExam(!openExam)}
					>
						<div className={styles.box_icon}>
							<UserOctagon size={18} />
						</div>
						<p className={styles.text}>
							{textExam?.text || 'Hình thức khám'}
						</p>

						<div
							className={clsx(styles.box_icon, {
								[styles.down]: openExam,
							})}
						>
							<ArrowDown2 size={20} />
						</div>
					</div>
				</TippyHeadless>

				{/* Thời gian */}
				<ButtonDateRanger
					Icon={CalendarSearch}
					title='Thời gian'
					keyName={keyNameTime}
				/>
			</div>

			<div className={styles.box_input}>
				<input
					className={styles.input}
					type='text'
					placeholder='Theo mã phiếu khám bệnh, mã bệnh nhân và tên bệnh nhân'
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

export default BoxFilter;
