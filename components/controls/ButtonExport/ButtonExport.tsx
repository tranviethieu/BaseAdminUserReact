import {ExportCurve} from 'iconsax-react';
import ImageFill from '~/components/common/ImageFill';
import icons from '~/constants/images/icons';
import styles from './ButtonExport.module.scss';
import {PropsButtonExport} from './interfaces';

function ButtonExport({handleExport}: PropsButtonExport) {
	return (
		<div className={styles.container} onClick={handleExport}>
			<div className={styles.icon}>
				<ImageFill style_1_1 src={icons.icon_export} />
			</div>
			<p className={styles.text}>Xuất file</p>
		</div>
	);
}

export default ButtonExport;
