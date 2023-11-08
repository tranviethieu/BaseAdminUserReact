import styles from './Loading.module.scss';
import {PropsLoading} from './interfaces';

function Loading({}: PropsLoading) {
	return (
		<div className={styles.container}>
			<div className={styles.ldsSpinner}>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
			<h3 className={styles.text}>Đang tải . . .</h3>
			<p>Chúng tôi tìm kiếm trong cơ sở dữ liệu.</p>
		</div>
	);
}

export default Loading;
