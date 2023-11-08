import clsx from 'clsx';
import {createContext, useEffect, useState} from 'react';
import styles from './BaseLayout.module.scss';
import Header from './components/Header';
import MenuTab from './components/MenuTab';
import {PropsBaseLayout, TContextBaseLayout} from './interfaces';
import {useRouter} from 'next/router';

export const ContextBaseLayout = createContext<TContextBaseLayout>({});

function BaseLayout({children, title}: PropsBaseLayout) {
	const router = useRouter();
	const [show, setShow] = useState<boolean>(true);

	useEffect(() => {
		setShow(false);
	}, [router]);

	return (
		<ContextBaseLayout.Provider value={{show, setShow}}>
			<div className={clsx(styles.container)}>
				<div className={clsx(styles.tab, {[styles.tab_show]: show})}>
					<MenuTab />
				</div>
				<div className={styles.header}>
					<div className={styles.main_header}>
						<Header title={title} />
					</div>
				</div>
				<div className={styles.main}>
					<div className={styles.wrapper}>{children}</div>
				</div>
				{show && (
					<div
						className={styles.overlay}
						onClick={() => setShow(false)}
					></div>
				)}
			</div>
		</ContextBaseLayout.Provider>
	);
}

export default BaseLayout;
