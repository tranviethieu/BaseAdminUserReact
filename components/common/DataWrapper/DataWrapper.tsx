import {Fragment} from 'react';
import Loading from './components/Loading';
import Noti from './components/Noti';
import styles from './DataWrapper.module.scss';
import {PropsDataWrapper} from './interfaces';

function DataWrapper({
	loading,
	data = [],
	children,
	noti = <Noti />,
}: PropsDataWrapper) {
	return (
		<Fragment>
			{loading ? (
				<div className={styles.container}>
					<div className={styles.loading}>
						<Loading />
					</div>
				</div>
			) : null}
			{!loading && data?.length <= 0 ? (
				<div className={styles.container}>
					<div className={styles.loading}>{noti}</div>
				</div>
			) : null}
			{!loading && data?.length > 0 ? children : null}
		</Fragment>
	);
}

export default DataWrapper;
