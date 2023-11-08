import styles from './LayoutAuth.module.scss';
import {PropsLayoutAuth} from './interfaces';
import backgrounds from '~/constants/images/backgrounds';
import ImageFill from '~/components/common/ImageFill';
import icons from '~/constants/images/icons';
import clsx from 'clsx';

function LayoutAuth({children, background}: PropsLayoutAuth) {
	return (
		<div className={styles.container}>
			<div className={clsx(styles.main, 'effectShow')}>
				<div className={styles.logo}>
					<ImageFill
						className={styles.img}
						src={icons.logo_doctor}
						alt='login mobi workspace'
					/>
				</div>
				<div className={styles.form}>{children}</div>
			</div>
			<div
				className={styles.background}
				style={{
					backgroundImage: `url(${
						background ? background.src : backgrounds.login.src
					})`,
				}}
			></div>
		</div>
	);
}

export default LayoutAuth;
