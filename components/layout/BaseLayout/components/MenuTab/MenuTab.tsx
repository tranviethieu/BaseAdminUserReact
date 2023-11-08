import styles from './MenuTab.module.scss';
import {PropsMenuTab} from './interfaces';
import ImageFill from '~/components/common/ImageFill';
import icons from '~/constants/images/icons';

import {useCallback} from 'react';
import clsx from 'clsx';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {listMenu} from '~/constants/configs';

function MenuTab({}: PropsMenuTab) {
	const router = useRouter();

	const checkActive = useCallback(
		(pathname: string) => {
			const currentRoute = router.pathname.split('/')[1];
			return pathname == `/${currentRoute}`;
		},
		[router]
	);

	return (
		<div className={clsx(styles.container)}>
			<div className={styles.header}>
				<div className={styles.logo}>
					<ImageFill
						className={styles.img}
						src={icons.logo_white}
						alt='logo mobimed doctor'
						priority
					/>
				</div>
			</div>

			<div className={styles.center}>
				{/* Tổng quan */}
				<div className={styles.menu}>
					<h3 className={styles.text_title}>MENU</h3>
					{listMenu[0].map((v: any, i: any) => (
						<Link
							key={i}
							href={v.href}
							className={clsx(styles.item, {
								[styles.active]: checkActive(v.href),
							})}
						>
							<div className={styles.icon}>
								{<v.icon size={20} />}
							</div>
							<p>{v.title}</p>
						</Link>
					))}
					<div className={styles.line}></div>
				</div>

				{/* QUẢN LÝ */}
				<div className={styles.menu}>
					<h3 className={styles.text_title}>QUẢN LÝ</h3>
					{listMenu[1].map((v: any, i: any) => (
						<Link
							key={i}
							href={v.href}
							className={clsx(styles.item, {
								[styles.active]: checkActive(v.href),
							})}
						>
							<div className={styles.icon}>
								{<v.icon size={20} />}
							</div>
							<p>{v.title}</p>
						</Link>
					))}
					<div className={styles.line}></div>
				</div>

				{/* HỆ THỐNG */}
				<div className={styles.menu}>
					<h3 className={styles.text_title}>HỆ THỐNG</h3>
					{listMenu[2].map((v: any, i: any) => (
						<Link
							key={i}
							href={v.href}
							className={clsx(styles.item, {
								[styles.active]: checkActive(v.href),
							})}
						>
							<div className={styles.icon}>
								{<v.icon size={20} />}
							</div>
							<p>{v.title}</p>
						</Link>
					))}
				</div>

				<div className={styles.line}></div>
			</div>

			{/* <div className={styles.user}>
				<div className={styles.line_2}></div>
				
				<div className={styles.menu}>
					<h3 className={styles.text_title}>HỆ THỐNG</h3>
					{listMenu[2].map((v: any, i: any) => (
						<Link
							key={i}
							href={v.href}
							className={clsx(styles.item, {
								[styles.active]: checkActive(v.href),
							})}
						>
							<div className={styles.icon}>
								{<v.icon size={20} />}
							</div>
							<p>{v.title}</p>
						</Link>
					))}
				</div>
			</div> */}
		</div>
	);
}

export default MenuTab;
