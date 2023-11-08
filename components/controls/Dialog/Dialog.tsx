import Button from '../Button';
import Popup from '~/components/common/Popup';
import {PropsDialog} from './interfaces';
import clsx from 'clsx';
import styles from './Dialog.module.scss';
import {AiFillExclamationCircle} from 'react-icons/ai';

function Dialog({
	titleSubmit = 'Xác nhận',
	titleCancel = 'Hủy bỏ',
	...props
}: PropsDialog) {
	return (
		<Popup open={props.open} onClose={props.onClose}>
			<div className={clsx('effectZoom', styles.popup)}>
				<div className={styles.image}>
					<AiFillExclamationCircle color='#0071CE' size={48} />
				</div>
				<h4 className={styles.titlePopup}>{props.title}</h4>
				<p className={styles.note}>{props?.note}</p>
				<div className={styles.groupBtnPopup}>
					<Button grey rounded_8 bold p_8_24 onClick={props.onClose}>
						{titleCancel}
					</Button>
					<Button
						primary
						bold
						rounded_8
						p_8_24
						onClick={props.onSubmit}
						{...props}
					>
						{titleSubmit}
					</Button>
				</div>
			</div>
		</Popup>
	);
}

export default Dialog;
