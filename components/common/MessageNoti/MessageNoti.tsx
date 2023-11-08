import Button from '~/components/controls/Button';
import ImageFill from '../ImageFill';
import {PropsMessageNoti} from './interfaces';
import backgrounds from '~/constants/images/backgrounds';
import styles from './MessageNoti.module.scss';

function MessageNoti({
	image,
	title,
	des,
	btn,
	text_btn,
	href,
	width,
}: PropsMessageNoti) {
	return (
		<div className={styles.container}>
			<div
				className={styles.img}
				style={width != undefined ? {width: width} : {}}
			>
				<ImageFill
					src={image || backgrounds.empty_notify}
					style_1_1
					layout='fill'
				/>
			</div>
			{title || <h3>Danh sách trống!</h3>}
			{des || <p>Hiện tại chưa có dữ liệu!</p>}

			{btn && (
				<Button rounded_6 p_8_24 primary_2 maxContent href={href || ''}>
					{text_btn}
				</Button>
			)}
		</div>
	);
}

export default MessageNoti;
