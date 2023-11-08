import styles from './Search.module.scss';
import {PropsSearch} from './interfaces';
import ImageFill from '~/components/common/ImageFill';
import icons from '~/constants/images/icons';
import {Fragment} from 'react';
import clsx from 'clsx';

function Search({style_2, placeholder = 'Nhập từ khóa tìm kiếm'}: PropsSearch) {
	return (
		<Fragment>
			{style_2 ? (
				<div className={clsx(styles.container, styles.style2)}>
					<div className={styles.icon}>
						<ImageFill style_1_1 src={icons.seach} />
					</div>
					<input placeholder={placeholder} />
				</div>
			) : (
				<div className={styles.container}>
					<div className={styles.icon}>
						<ImageFill style_1_1 src={icons.seach} />
					</div>
					<p>Tìm kiếm</p>
				</div>
			)}
		</Fragment>
	);
}

export default Search;
