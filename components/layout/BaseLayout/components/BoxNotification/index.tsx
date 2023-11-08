import React, {useEffect, useState} from 'react';
import {BsCheck2All} from 'react-icons/bs';

import styles from './BoxNotification.module.scss';
import clsx from 'clsx';
import Avatar from '~/components/common/Avatar/Avatar';
import ImageFill from '~/components/common/ImageFill/ImageFill';
import icons from '~/constants/images/icons';
import {httpRequest} from '~/services';
import notificationService from '~/services/notification';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import {
	NAVIGATE_TYPE_NOTI,
	STATUS_EXAM,
	STATUS_NOTI,
} from '~/constants/mock/enum';
import Moment from 'react-moment';
import {useRouter} from 'next/router';

function BoxNotification({onHide}: any) {
	const page = 1;
	const router = useRouter();
	const {token} = useSelector((state: RootState) => state.auth);
	const {accountId} = useSelector((state: RootState) => state.user);

	const [total, setTotal] = useState<number>(0);
	const [limit, setLimit] = useState<number>(10);
	const [notis, setNotis] = useState<Array<any>>([]);

	// Call api
	useEffect(() => {
		if (token) {
			httpRequest({
				http: notificationService.getAllNotification({
					token: token!,
					AccountUuid: accountId as string,
					Limit: limit,
					Page: page,
				}),
			}).then((data) => {
				if (data) {
					setNotis(data?.notifications?.items);
					setTotal(data?.notifications?.pagination?.totalCount);
				}
			});
		}
	}, [accountId, limit, router, token]);

	const handleSeeMore = () => {
		setLimit(limit + 5);
	};

	// Click noti đọc thông bóa
	const handleReadNoti = (
		uuid: string,
		ticketUuid: string,
		navigateType: number,
		state: number | null
	) => {
		// Call api đọc thông báo
		if (token) {
			httpRequest({
				http: notificationService.readNotification({
					token: token!,
					uuid: uuid,
				}),
			});
		}

		// hide box noti
		onHide();

		// navigateType == 0 || null không điều hướng
		if (
			navigateType == NAVIGATE_TYPE_NOTI.KHONG_DIEU_HUONG ||
			navigateType == null
		) {
			return null;
		}

		// navigateType == 1 điều hướng đến Lịch hẹn khám
		if (navigateType == NAVIGATE_TYPE_NOTI.LICH_HEN_KHAM) {
			if (
				state == STATUS_EXAM.DA_XAC_NHAN ||
				state == STATUS_EXAM.DA_DUYET
			) {
				router.push(`/appointment-schedule?uuid=${ticketUuid}`);
			}
			if (
				state == STATUS_EXAM.CHO_KHAM ||
				state == STATUS_EXAM.DEN_LUOT_KHAM ||
				state == STATUS_EXAM.DANG_KHAM
			) {
				router.push(
					`/appointment-schedule?_status=happenning&uuid=${ticketUuid}`
				);
			}

			if (
				state == STATUS_EXAM.DA_KHAM ||
				state == STATUS_EXAM.TU_CHOI ||
				state == STATUS_EXAM.DA_HUY
			) {
				router.push(
					`/appointment-schedule?_status=end&uuid=${ticketUuid}`
				);
			}
		}

		// navigateType == 2 điều hướng sang chi tiết phiếu khám
		if (navigateType == NAVIGATE_TYPE_NOTI.PHIEU_KHAM_BENH) {
			router.push(`/patient-examination/detail/${ticketUuid}`);
		}

		//  navigateType == 4 điều hướng đến danh sách Lịch hẹn khám
		if (navigateType == NAVIGATE_TYPE_NOTI.DANH_SACH_LICH_HEN_KHAM) {
			if (
				state == STATUS_EXAM.DA_XAC_NHAN ||
				state == STATUS_EXAM.DA_DUYET
			) {
				router.push(`/appointment-schedule`);
			}
			if (
				state == STATUS_EXAM.CHO_KHAM ||
				state == STATUS_EXAM.DEN_LUOT_KHAM ||
				state == STATUS_EXAM.DANG_KHAM
			) {
				router.push(`/appointment-schedule?_status=happenning`);
			}

			if (
				state == STATUS_EXAM.DA_KHAM ||
				state == STATUS_EXAM.TU_CHOI ||
				state == STATUS_EXAM.DA_HUY
			) {
				router.push(`/appointment-schedule?_status=end`);
			}
		}
	};

	// Đọc tất cả
	const handleReadAllNoti = () => {
		if (token) {
			httpRequest({
				http: notificationService.readAllNotification({
					token: token!,
					AccountUuid: accountId as string,
				}),
			}).then((data) => {
				if (data) {
					router.replace(router.asPath);
				}
			});
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<h4 className={styles.title}>Thông báo</h4>
				<div className={styles.read_all} onClick={handleReadAllNoti}>
					<div className={styles.icon}>
						<BsCheck2All size={24} />
					</div>
					<p className={styles.text}>Đọc tất cả</p>
				</div>
			</div>

			{/* Link màn chi tiết lịch khám */}
			<div className={styles.list_noti}>
				{notis?.length > 0 ? (
					<>
						{notis.map((v: any) => (
							<div
								key={v.uuid}
								className={clsx(styles.noti_item, {
									[styles.notRead]:
										v.status.id == STATUS_NOTI.CHUA_DOC,
								})}
								onClick={() => {
									handleReadNoti(
										v.uuid,
										v.webUrl,
										v.navigateType.id,
										v.urlState
									);
								}}
							>
								<div className={styles.box_avatar}>
									<Avatar
										src={`${process.env.NEXT_PUBLIC_URL_FILE}/${v.avatarCreatedBy}`}
										className={styles.avatar}
									/>
									{v.status.id == STATUS_NOTI.CHUA_DOC && (
										<div className={styles.position}></div>
									)}
								</div>
								<div className={styles.box_content}>
									<div
										className={styles.row_1}
										dangerouslySetInnerHTML={{
											__html: v.content,
										}}
									></div>
									<p className={styles.time}>
										<Moment
											fromNow
											date={v.timeCreated}
											locale='vi'
										/>
									</p>
								</div>
							</div>
						))}
					</>
				) : (
					<div className={styles.empty_noti}>
						<div className={styles.image}>
							<ImageFill src={icons.empty_noti} style_1_1 />
						</div>
						<p className={styles.text_noti}>
							Cỏ vẻ bạn chưa có thông báo nào!
						</p>
					</div>
				)}
			</div>
			{total > page * limit && (
				<div className={styles.see_more}>
					<p onClick={handleSeeMore}>Xem thêm...</p>
				</div>
			)}
		</div>
	);
}

export default BoxNotification;
