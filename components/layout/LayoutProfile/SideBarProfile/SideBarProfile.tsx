import React, {Fragment, useCallback, useState} from 'react';
import styles from './SideBarProfile.module.scss';
import {listSidebarProfile} from '~/constants/configs';
import Link from 'next/link';
import {Logout} from 'iconsax-react';
import {useRouter} from 'next/router';
import clsx from 'clsx';
import Dialog from '~/components/controls/Dialog';
import {useDispatch} from 'react-redux';
import {setStateLogin, setToken} from '~/redux/reducer/auth';
import {setAccountId, setInfoDoctor} from '~/redux/reducer/user';

function SideBarProfile() {
	const router = useRouter();
	const dispatch = useDispatch();

	const [showPopupSignOut, setShowPopupSignOut] = useState<boolean>(false);

	const checkActive = useCallback(
		(pathname: string) => {
			return pathname == router.pathname;
		},
		[router]
	);

	const handleLogout = async () => {
		setShowPopupSignOut(false);
		dispatch(setToken(null));
		dispatch(setAccountId(null));
		dispatch(setInfoDoctor(null));
		dispatch(setStateLogin(false));
	};

	return (
		<Fragment>
			<div className={styles.container}>
				<div>
					{listSidebarProfile.map((v, i) => (
						<Link
							key={i}
							href={v.href}
							className={clsx(styles.item, {
								[styles.active]: checkActive(v.href),
							})}
						>
							<div className={styles.icon}>
								<v.icon size={20} />
							</div>
							{v.title}
						</Link>
					))}
				</div>
				<div className={styles.logout}>
					<div
						className={styles.btn}
						onClick={() => setShowPopupSignOut(true)}
					>
						<div className={styles.icon_btn}>
							<Logout size={20} />
						</div>
						<p className={styles.text_btn}>Đăng xuất</p>
					</div>
				</div>
			</div>

			<Dialog
				open={showPopupSignOut}
				onClose={() => setShowPopupSignOut(false)}
				onSubmit={handleLogout}
				titleCancel='Hủy'
				titleSubmit='Đăng xuất'
				title='Đăng xuất khỏi hệ thống!'
				note='Bạn có chắc chắn muốn đăng xuất khỏi hệ thống!'
			/>
		</Fragment>
	);
}

export default SideBarProfile;
