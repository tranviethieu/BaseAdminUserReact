import styles from './Noti.module.scss';
import {PropsNoti} from './interfaces';
import ImageFill from '~/components/common/ImageFill';
import backgrounds from '~/constants/images/backgrounds';

function Noti({
	img = backgrounds.table_noti,
	title = 'Không có dữ liệu',
	des = 'Hiện tại không có dữ liệu!',
}: PropsNoti) {
	return (
		<div className={styles.container}>
			<div className={styles.img}>
				<ImageFill className={styles.icon} src={img} />
			</div>
			<h3>{title}</h3>
			<p>{des}</p>
		</div>
	);
}

export default Noti;
