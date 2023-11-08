import styles from './Header.module.scss';
import {PropsHeader} from './interfaces';
import {HiMenuAlt1} from 'react-icons/hi';
import {useContext, useEffect, useState} from 'react';
import {TContextBaseLayout} from '../../interfaces';
import {ContextBaseLayout} from '../../BaseLayout';
import {NotificationBing} from 'iconsax-react';
import Avatar from '~/components/common/Avatar/Avatar';
import BoxNotification from '../BoxNotification';
import BoxProfile from '../BoxProfile';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import TippyHeadless from '@tippyjs/react/headless';
import {httpRequest} from '~/services';
import notificationService from '~/services/notification';
import {useRouter} from 'next/router';
import useWindowWidth from '~/common/hooks/useWindowWidth';

function Header({title}: PropsHeader) {
	const router = useRouter();
	const widthWidth = useWindowWidth();

	const context = useContext<TContextBaseLayout>(ContextBaseLayout);

	const [open, setOpen] = useState<boolean>(false);
	const [admin, setAdmin] = useState<boolean>(false);
	const [noti, setNoti] = useState<number>(0);
	const [width, setWidth] = useState<number>(0);

	const {infoDoctor, accountId} = useSelector(
		(state: RootState) => state.user
	);
	const {token} = useSelector((state: RootState) => state.auth);

	// Call api lấy số thông báo chưa đọc
	useEffect(() => {
		if (token) {
			httpRequest({
				http: notificationService.ping({
					token: token!,
					AccountUuid: accountId as string,
				}),
			}).then((data) => {
				if (data) {
					setNoti(data.totalUnread);
				}
			});
		}
	}, [accountId, router, token]);

	useEffect(() => {
		setWidth(widthWidth);
	}, [router, widthWidth]);

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<div
					className={styles.arrow}
					onClick={() => {
						if (width > 1200) {
							context?.setShow!(false);
						} else {
							context?.setShow!(!context?.show);
						}
					}}
				>
					<HiMenuAlt1 className={styles.icon_arrow} />
				</div>
				<h3 className={styles.title}>{title}</h3>
			</div>
			<div className={styles.right}>
				<TippyHeadless
					maxWidth={'100%'}
					interactive
					visible={open}
					onClickOutside={() => setOpen(false)}
					placement='bottom'
					render={(attrs) => (
						<BoxNotification onHide={() => setOpen(false)} />
					)}
				>
					<div className={styles.icon} onClick={() => setOpen(!open)}>
						<NotificationBing size={24} color='#292D32' />
						{noti > 0 && (
							<div className={styles.box_number}>
								<p className={styles.number}>
									{noti >= 10 ? `9+` : noti}
								</p>
							</div>
						)}
					</div>
				</TippyHeadless>

				<TippyHeadless
					maxWidth={'100%'}
					interactive
					visible={admin}
					onClickOutside={() => setAdmin(false)}
					placement='bottom'
					render={(attrs) => (
						<BoxProfile onHide={() => setAdmin(false)} />
					)}
				>
					<div
						className={styles.admin}
						onClick={() => setAdmin(true)}
					>
						<Avatar
							src={`${process.env.NEXT_PUBLIC_URL_FILE}/${infoDoctor?.avatar}`}
						/>
						<div className={styles.info}>
							<h4 className={styles.name}>
								{infoDoctor?.fullName}
							</h4>
						</div>
					</div>
				</TippyHeadless>
			</div>
		</div>
	);
}

export default Header;
