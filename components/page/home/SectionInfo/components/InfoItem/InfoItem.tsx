import {PropsInfoItem} from './interfaces';
import styles from './InfoItem.module.scss';

function InfoItem({title, number}: PropsInfoItem) {
	return (
		<div className={styles.container}>
			<p className={styles.title}>{title}</p>
			<p className={styles.number}>{number}</p>
		</div>
	);
}

export default InfoItem;
