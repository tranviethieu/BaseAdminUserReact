import ImageFill from '~/components/common/ImageFill';
import {PropsSectionHello} from './interfaces';
import backgrounds from '~/constants/images/backgrounds';
import icons from '~/constants/images/icons';
import styles from './SectionHello.module.scss';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';

function SectionHello({}: PropsSectionHello) {
	const {infoDoctor} = useSelector((state: RootState) => state.user);

	return (
		<div className={styles.container}>
			<div className={styles.text}>
				<h3>
					Chào mừng trở lại, <span>{infoDoctor?.fullName}</span>
				</h3>
				<p>Chúc bạn có một ngày làm việc vui vẻ.</p>
				<div className={styles.hand}>
					<ImageFill style_1_1 src={icons.hand_hello} />
				</div>
			</div>
			<div className={styles.img}>
				<ImageFill style_1_1 src={backgrounds.doctor_hello} />
			</div>
		</div>
	);
}

export default SectionHello;
