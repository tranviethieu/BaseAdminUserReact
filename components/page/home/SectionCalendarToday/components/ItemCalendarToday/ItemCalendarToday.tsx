import {Fragment, useState} from 'react';
import {RiArrowDownSLine, RiHospitalFill} from 'react-icons/ri';

import Avatar from '~/components/common/Avatar';
import {PropsItemCalendarToday} from './interfaces';
import TippyHeadless from '@tippyjs/react/headless';
import clsx from 'clsx';
import styles from './ItemCalendarToday.module.scss';
import CheckTypeStatus from '~/components/common/CheckTypeStatus';
import {HiHome, HiVideoCamera} from 'react-icons/hi';
import {TYPE_EXAM} from '~/constants/mock/enum';

function ItemCalendarToday({time, users, isOdd}: PropsItemCalendarToday) {
	const [showDropDown, setShowDropDown] = useState(false);

	return (
		<Fragment>
			{!isOdd || users[0] ? (
				<div className={styles.container}>
					{!isOdd ? <div className={styles.dot1}></div> : null}
					{!isOdd ? <p className={styles.time}>{time}</p> : null}
					{users[0] ? (
						<div className={styles.main}>
							{/* <div className={styles.status}></div> */}
							<CheckTypeStatus dot type={users[0].state.id} />
							{/* <p className={styles.timeExam}>{time}</p> */}
							<div className={styles.address_type}>
								{users[0]?.addressType?.id ==
									TYPE_EXAM.CO_SO_Y_TE && (
									<RiHospitalFill color='#4CD28A' size={14} />
								)}
								{users[0]?.addressType?.id ==
									TYPE_EXAM.TRUC_TUYEN && (
									<HiVideoCamera color='#00B1FF' size={16} />
								)}
								{users[0]?.addressType?.id ==
									TYPE_EXAM.TAI_NHA && (
									<HiHome color='#9D88F0' size={16} />
								)}
							</div>
							<p className={styles.nameUser}>{users[0]?.name}</p>
							<div className={styles.statusText}>
								<CheckTypeStatus sm type={users[0].state.id} />
							</div>
							<div className={styles.actions}>
								{users.length > 1 ? (
									<div>
										<TippyHeadless
											maxWidth={'100%'}
											interactive
											visible={showDropDown}
											onClickOutside={() =>
												setShowDropDown(false)
											}
											placement='bottom-end'
											render={(attrs) => (
												<div
													className={
														styles.mainDropDown
													}
												>
													{users.map((v, i) => (
														<div
															className={
																styles.itemDrop
															}
															key={i}
														>
															<p
																className={
																	styles.nameUser
																}
															>
																{v.name}
															</p>
															<div
																className={
																	styles.address_type
																}
															>
																{v?.addressType
																	?.id ==
																	TYPE_EXAM.CO_SO_Y_TE && (
																	<RiHospitalFill
																		color='#4CD28A'
																		size={
																			14
																		}
																	/>
																)}

																{v?.addressType
																	?.id ==
																	TYPE_EXAM.TRUC_TUYEN && (
																	<HiVideoCamera
																		color='#00B1FF'
																		size={
																			16
																		}
																	/>
																)}

																{v?.addressType
																	?.id ==
																	TYPE_EXAM.TAI_NHA && (
																	<HiHome
																		color='#9D88F0'
																		size={
																			16
																		}
																	/>
																)}
															</div>
															<div
																className={
																	styles.statusText
																}
															>
																<CheckTypeStatus
																	sm
																	type={
																		v.state
																			.id
																	}
																/>
															</div>
															<div
																className={
																	styles.actions
																}
															>
																<div
																	className={
																		styles.justOnly
																	}
																>
																	<Avatar
																		src={`${process.env.NEXT_PUBLIC_URL_FILE}/${v.image}`}
																		className={
																			styles.avatar
																		}
																	/>
																	{/* Thao tác dashboard */}
																	{/* <div
																		className={
																			styles.groupBtn
																		}
																	>
																		<div
																			className={
																				styles.btnOption
																			}
																		>
																			<RiCheckFill />
																		</div>
																		<div
																			className={
																				styles.btnOption
																			}
																		>
																			<RiCloseLine />
																		</div>
																	</div> */}
																</div>
															</div>
														</div>
													))}
												</div>
											)}
										>
											<div
												className={styles.mutilUser}
												onClick={() =>
													setShowDropDown(
														!showDropDown
													)
												}
											>
												<div
													className={
														styles.groupAvatar
													}
												>
													{users.map((v, i) => {
														if (i <= 2) {
															return (
																<Avatar
																	key={i}
																	src={`${process.env.NEXT_PUBLIC_URL_FILE}/${v.image}`}
																	className={
																		styles.avatar
																	}
																/>
															);
														}
													})}
													{users.length > 3 ? (
														<div
															className={
																styles.dot
															}
														>
															+{users.length - 3}
														</div>
													) : null}
												</div>
												<div
													className={styles.groupBtn}
												>
													<div
														className={clsx(
															styles.btnOption,
															styles.dropDown
														)}
													>
														<RiArrowDownSLine />
													</div>
												</div>
											</div>
										</TippyHeadless>
									</div>
								) : (
									<div className={styles.justOnly}>
										<Avatar
											src={`${process.env.NEXT_PUBLIC_URL_FILE}/${users[0].image}`}
											className={styles.avatar}
										/>
										{/* Thao tác dashboard */}
										{/* <div className={styles.groupBtn}>
											<div className={styles.btnOption}>
												<RiCheckFill />
											</div>
											<div className={styles.btnOption}>
												<RiCloseLine />
											</div>
										</div> */}
									</div>
								)}
							</div>
						</div>
					) : null}
				</div>
			) : null}
		</Fragment>
	);
}

export default ItemCalendarToday;
